# AttractiveLife

## 概要
センサーで記録したデータを管理できるシステム。
VR時代の到来を迎えて、VRヘッドセットをつけたまま寝る人が増えています、VRの画面を見ながら
仮想空間で寝付けることをVR睡眠と呼ばれています。
このシステムの一つの用途として、VR睡眠の質を観測することができます。
市販のセンサー利用して、使用者が寝ている間に、センサーで記録したデーターは自動的にサーバ
ーに送信されます。
全てのデーターはデータベースに保存・管理され、PC・スマートフォンなどウェブ閲覧可能なプラット
フォームであれば、いつどこでも見ることができます。

## 技術スタック
- React https://reactjs.org/
- Material UI https://mui.com/
- Next.js https://nextjs.org/
- Nest.js https://nestjs.com/
- Docker https://www.docker.com/

## Dockerコンテナ構造・ポート
| Port  | Container       |
| ----- | --------------- |
| :80   | nginx proxy     |
| :3000 | frontend        |
| :4000 | backend / api   |
| :3306 | mariadb         |

## 使い方
