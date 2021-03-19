---
title: "Arduino 溫溼度計 Part 2 – 用 Ethernet Shield 連上網路"
slug: "arduino-hygrothermometer-part-2-ethernet-shield"
cover: ""
created: "2017-08-15 22:00:16"
updated: "2019-07-10 03:41:48"
categories:
    - "Arduino"
tags:
    - "Arduino"
    - "Ethernet Shield"
---

在[本系列的第一篇文](../arduino-hygrothermometer-part-1-dht22-sensors)中，我們用 Arduino Uno 接收 DHT22 模組傳來的溫溼度訊號，並經由 USB 將 Arduino 輸出的資料顯示在電腦的序列埠監控視窗中。雖然這對示範 DHT11 或 DHT22 這種溫溼度感測器的功能來說已經很夠用了，不過如果感測器測出來的溫度和濕度只能用 Arduino 的 IDE 上看的話，那就太不方便了。所以要把資料傳出去，讓我們能在之後使用。傳出去的方法很多，藍牙、 Wi-Fi 、有線網路都可以。在本文中使用的是有線網路。

在一切開始之前，先確認以下材料是否都齊全了：

+-------------------------+--------+
| Part 1 中做出來的東西   |        |
+-------------------------+--------+
| Ethernet Shield         | 1塊    |
+-------------------------+--------+
| 網路線                  | 足夠長 |
+-------------------------+--------+

[![Obrazek Ethernet](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Obrazek_Ethernet.jpg/512px-Obrazek_Ethernet.jpg)](https://commons.wikimedia.org/wiki/File:Obrazek_Ethernet.jpg "R.hampl [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)], via Wikimedia Commons")

Ethernet Shield 之所以叫 Ethernet "Shield" 是因為它跟一般的模組不一樣，Ethernet Shield 的腳位跟 Arduino 相容，使它可以插在 Arduino Uno 上面，看起來就像盾牌一樣。 [shieldlist.org](http://shieldlist.org/) 列出了 Arduino 可以使用的 shield，以及他們使用的腳位之類的有用資訊，比如 [shieldlist.org 中 Ethernet Shield 的資料](http://shieldlist.org/arduino/ethernet-v5)。

## 硬體部分

[![](https://farm7.staticflickr.com/6188/6124343569_a899713a1b_z.jpg)](https://flic.kr/p/akbRYv)  
示意圖，非當事 Arduino  
by [Gaël Chardon](https://www.flickr.com/photos/gael/) , 於 Flickr

1. 記住 Arduino 上插的線的位置
2. 把 Arduino 上插的線都拔掉
3. 把 Ethernet Shield 插在 Arduino Uno 上
4. 把剛剛拔的線接在 Ethernet Shield 的相對位置上
5. 把網路線接在 Ethernet Shield 的 RJ45 接頭與路由器(或其他可以接上網路的接頭)上

把 Ethernet Shield 插在 Arduino Uno 上時，要小心不要讓針腳歪掉，高度也應該跟示意圖相同。除此之外都很簡單。

## 軟體部分

### 建立網路連線、取得 IP 位址

要能成功連上網路，就要讓 Arduino 取得 IP 位址。裝置取得 IP 位址的方式有 2 種：

1. 系統管理員手動設定 IP 位址
2. DHCP (Dynamic Host Configuration Protocol)：讓裝置能自動取得IP位址

對應的程式碼分別如下：

1. `Ethernet.begin(mac, ip);`
2. `Ethernet.begin(mac); `

(`mac` = MAC 位址、`ip` = IP 位址)

因為使用 DHCP 取得 IP 位址比較簡單，所以使用第二種方法。

詳情可以參考這邊的程式碼：
[Arduino Ethernet Shield W5100 乙太網路擴充版，使用 DHCP 取得 IP 位址](http://www.gtwang.org/2015/02/arduino-ethernet-shield-w5100-dhcp-ip-address.html)

這個範例與[官方範例 DHCP Address Printer](https://www.arduino.cc/en/Tutorial/DhcpAddressPrinter) 的不同點是他沒有定時 call `Ethernet.maintain()` 確保 Arduino 有定時更新 IP 租約，雖然我也沒有。

! 還是加比較好。  
! 放太久導致租約到期的話網路就會斷線。所以如果要長時間運作的話，還是要加 `Ethernet.maintain()` 以定時更新 IP 租約。

## 建立與伺服器的連線

這次我想讓 Arduino 作為 client ，傳送溫濕度的資料給某個 server ，再由 server 將資料存起來。所以必須先建立與那個伺服器的連線。

```arduino
#include <Ethernet.h>;

byte mac[] = {0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02};
//宣告 client
EthernetClient client;

void setup() {
  Serial.begin(9600);
  Ethernet.begin(mac);
  //與伺服器連線
  if(client.connect("vrabe.tw", 80)){
    //輸出字串給伺服器
    client.println("Hello, world!");
  }
}

void loop() {
}
```

上面的是已經簡化過也沒驗證過的程式碼。可以看出這次要講的 function 是 `client.connect()` ，他的回傳值代表有沒有連線成功，參數分別是網址與 port number。

建立連線後就可以開始傳資料，`client.println()` 看起來就跟 `Serial.println()` 的用法一樣，只是一個是將字串傳給連線的另外一方，另一個是將字串傳給序列埠的另外一邊。

不過這個程式還真的沒什麼意義。在下一篇 Part. 3 中，我們要用伺服器看得懂的格式 HTTP 跟它溝通，看起來跟[這個](https://www.arduino.cc/en/Tutorial/WebClient)有點像。

## 參考資料

* [Arduino - Ethernet](https://www.arduino.cc/en/Reference/Ethernet)
* [小狐狸事務所: Arduino 乙太網擴充卡測試](http://yhhuang1966.blogspot.tw/2015/03/arduino_28.html)
* [Arduino Ethernet Shield W5100 乙太網路擴充板，使用 DHCP 取得 IP 位址 - G. T. Wang](https://blog.gtwang.org/iot/arduino-ethernet-shield-w5100-dhcp-ip-address/)
