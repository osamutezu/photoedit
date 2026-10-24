# Analog Image Processor — PWA prototype v1

これはSwiftUI版v35とは別のWeb版プロトタイプです。元のSwiftUIプロジェクトには変更を加えていません。

## 実装済み
- iPhone/iPad向けレスポンシブUI、12項目のギャラリー
- 端末内で写真を読み込み、Canvasで処理
- 1-BIT DITHER、HALFTONE、ATMOSPHERE（DREAMCORE / BACKROOMS / LIMINAL SPACE）の**試作アルゴリズム**
- スライダー、プレビュー、画像の共有・保存
- Web App Manifest、Service Worker（オフラインキャッシュ）、ホーム画面から独立起動

## 未実装
- 残り9ギャラリー項目の画像処理
- SwiftUI版v35と同一のアルゴリズム、全パラメータ、全プリセット、画質の一致
- フル解像度出力（現時点では長辺1800pxまで縮小）

## 公開方法
このフォルダのファイルを静的Webホスティングへ配置します。PWA機能はHTTPS（またはlocalhost）で利用してください。無料公開先の一例はGitHub Pagesです（公開リポジトリの内容は第三者が閲覧できます）。

iPhone/iPad: Safariで公開URLを開く → 共有 → ホーム画面に追加。以降はホーム画面のアイコンから起動できます。オフライン利用には最初のオンラインアクセスでキャッシュが作成される必要があります。

ローカル確認: フォルダ内で `python3 -m http.server 8000` を実行し、Macで `http://localhost:8000` を開いてください。iPhoneへのPWA登録はHTTPSの公開URLを使ってください。
