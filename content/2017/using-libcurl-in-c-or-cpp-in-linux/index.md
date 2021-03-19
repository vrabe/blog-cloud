---
title: "在Linux用C/C++編寫使用libcurl的程式"
slug: "using-libcurl-in-c-or-cpp-in-linux"
cover: ""
created: "2017-08-01 12:00:34"
updated: "2019-07-10 03:56:04"
categories:
    - "C&C++"
tags:
    - "C&C++"
    - "gcc"
    - "libcurl"
    - "linux"
    - "make"
---

如果要在Linux從網路上下載檔案的話，可以使用cURL。如果要在程式中使用的話，我們就需要它的函式庫版本－libcurl。

## 編譯與安裝

編譯需要的原始檔可以在[官網](https://curl.haxx.se/download.html)下載。  
其中一種下載方式是輸入指令：  
下載　　`wget https://curl.haxx.se/download/curl-7.54.1.tar.gz`    
解壓縮　`tar zxvf curl-7.54.1.tar.gz`

在 Linux 下，依照[官網](https://curl.haxx.se/docs/install.html)指示，在原始碼所在的目錄下，輸入：
```shell
./configure
make
make test
sudo make install
```
其中，`make test` 可以省略。

如果你的編譯器不是原來預設的那一個的話，也可以在 `./configure` 或是 `make` 後面加上 flag，如
```shell
./configure CC=gcc-7
```
如果以後要更新的話，也是依照以上步驟。

## 編譯程式

我們用官網上的範例：[10-at-a-time.c](https://curl.haxx.se/libcurl/c/10-at-a-time.html) 編譯看看吧。
在檔案所在的資料夾輸入以下指令：
```shell
gcc 10-at-a-time.c -lcurl
```
`-lcurl` 是 [Options for Linking](https://gcc.gnu.org/onlinedocs/gcc/Link-Options.html) 。加上這個連結器才會去找 libcurl 這個函式庫。

## 使用

使用流程大致是這樣：  
初始化>設定>執行>關閉  
以 easy handle 來說，每個階段對應到的函式是  
初始化：`curl_easy_init()`  
設定：`curl_easy_setopt()`  
執行：`curl_easy_perform()`  
關閉：`curl_easy_cleanup()` (handler可以重複利用，全部使用完再清掉 handler 即可)

在設定中，有 3 個選項比較重要：  
CURLOPT_URL：要取得的 url 位址  
CURLOPT_WRITEFUNCTION：將接收資料的程式(的函式指標)  
CURLOPT_WRITEDATA：資料將存入的空間指標(也可以說是將傳入 write function 的最後一個參數的指標)  

當程式執行完 `curl_easy_perform()` 後，我們就可以從 CURLOPT_WRITEDATA 所設定的指標中取得我們要從網路上取得的資料了。

## Write Function

得到資料後可以有 2 個方式處理

1. 存檔
2. 存到某個記憶體空間供後續使用

以下用 2 個範例說明上述 2 個狀況

1. [url2file.c](https://curl.haxx.se/libcurl/c/url2file.html) : `write_data()`
2. [htmltitle.cpp](https://curl.haxx.se/libcurl/c/htmltitle.html) : `writer()`

`write_data()` 的狀況比較單純。事先開好檔案，在函式用 fwrite，下載完關檔。  
`writer()` 看起來也很簡單，先new string，在函式中把資料 append 到 string，最後 string 中就是完整的資料。不過如果要改寫成字元指標呢？這樣的話就要先 malloc 一個空間，然後當資料進來的時候再 realloc 空間然後把新的資料複製到原本空間的後面囉。不過這一切有點複雜，幸好 Stack Overflow 上有範例可以參考：  
[[Stack Overflow] C libcurl get output into a string](https://stackoverflow.com/questions/2329571/c-libcurl-get-output-into-a-string)

## 簡單的例子

參考了上述的 [url2file.c](https://curl.haxx.se/libcurl/c/url2file.html) 寫了一個功能跟它差不多但更簡單一點的範例：

```c
#include <stdio.h>
#include <curl/curl.h>
#include <curl/easy.h>

size_t write_data(void *ptr, size_t size, size_t nmemb, FILE *stream) {
    size_t written = fwrite(ptr, size, nmemb, stream);
    return written;
}

int main() {
    CURL *curl;
    FILE *fp;
    CURLcode res;
    char error[CURL_ERROR_SIZE];
    char url[50] = "http://www.google.com.tw/"; //要下載的網址
    char outfilename[FILENAME_MAX] = "index.html"; //存檔路徑
	curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    if (curl) {
        fp = fopen(outfilename,"wb");
        curl_easy_setopt(curl, CURLOPT_URL, url); //設定網址
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, fp);
		//如果有錯誤的話會將錯誤寫在這邊的error buffer
        curl_easy_setopt(curl, CURLOPT_ERRORBUFFER, error);
        res = curl_easy_perform(curl);
        curl_easy_cleanup(curl);
        fclose(fp);
    }
    return 0;
}
```

## 結語

這邊只簡單的在 easy interface 下經由 HTTP 協定從網路上下載一個網頁/檔案。如果要使用其他通訊協定，或是做其他更複雜的事情（如 multi interface）的話，官網上都有詳盡的文件可以參考。

## 參考資料

* [[Stack Overflow] Make GNU make use a different compiler](https://stackoverflow.com/questions/2969222/make-gnu-make-use-a-different-compiler)
* <https://curl.haxx.se/libcurl/>
