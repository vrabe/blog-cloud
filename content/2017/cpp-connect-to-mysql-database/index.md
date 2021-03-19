---
title: "[C/C++]連接mysql資料庫"
slug: "cpp-connect-to-mysql-database"
cover: ""
created: "2017-08-22 23:18:30"
updated: "2019-07-10 03:56:41"
categories:
    - "C&C++"
tags:
    - "C&C++"
    - "MySQL"
    - "MySQL connector"
---

MySQL Connector/C++ 是 MySQL 官方開發，讓 C++ 程式能與 MySQL 資料庫進行溝通的函式庫。

其實官方的說明已經寫得很詳盡了，不過還是從網站中修改出幾個常見的情況的程式碼。

在使用前記得：

1. include header
```c
#include <cppconn/driver.h>
//如果有用 prepared statement 的話
#include <cppconn/prepared_statement.h>
```

2. [Options for Linking](https://gcc.gnu.org/onlinedocs/gcc/Link-Options.html) -lmysqlcppconn。
3. 最好使用 try-catch 防止 mysql 錯誤。  
或是直接複製[這裡](https://dev.mysql.com/doc/connector-cpp/en/connector-cpp-tutorials-background.html)的 try-catch 區塊?

## 與資料庫連線

```cpp
sql::Driver* driver;
sql::Connection* connection;

driver = get_driver_instance();
connection = driver->connect("tcp://127.0.0.1:3306", "user", "password");
connection->setSchema("myDatabase");

delete connection;
```

[修改自此](https://dev.mysql.com/doc/connector-cpp/en/connector-cpp-examples-connecting.html)。

## 在資料表新增資料

```cpp
sql::Driver* driver;
sql::Connection* connection;
sql::PreparedStatement* prep_stmt;

driver = get_driver_instance();
connection = driver->connect("tcp://127.0.0.1:3306", "user", "password");
connection->setSchema("myDatabase");

pstmt = con->prepareStatement("INSERT INTO test(id, label) VALUES (?, ?)");
pstmt->setInt(1, 1);
pstmt->setString(2, "a");
pstmt->execute();

delete pstmt;
delete connection;
```

[修改自此](https://dev.mysql.com/doc/connector-cpp/en/connector-cpp-examples-prepared-statements.html)。

## 在資料表查詢資料

```cpp
sql::Driver* driver;
sql::Connection* connection;
sql::Statement* stmt;
sql::ResultSet res;

driver = get_driver_instance();
connection = driver->connect("tcp://127.0.0.1:3306", "user", "password");
connection->setSchema("myDatabase");

stmt = connection->createStatement();
res = stmt->executeQuery("SELECT id FROM test");
while (res->next()) {
	cout<<res->getInt("id")<<endl;
}

delete res;
delete stmt;
delete connection;
```
[修改自此](https://dev.mysql.com/doc/connector-cpp/en/connector-cpp-examples-results.html)。

## 參考資料

* <https://dev.mysql.com/doc/connector-cpp/en/>

## 參見

* <http://programer-learn.blogspot.tw/2010/11/jsp-preparedstatement.html>

隨便 google 了一個 prepared statement 的介紹。發現這個 library 跟 Java 的 java.sql 很像?
