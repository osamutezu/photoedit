# Analog Image Processor — PWA v6

最新版v5の全13ギャラリー項目を引き継ぎ、v5で起きていたJavaScript初期化エラーを修正しました。

## 重要な修正

- `index.html` で `$` が定義される前に言語切替ボタンへイベントを登録していた問題を修正。これはスクリプト全体の停止につながるエラーです。
- 魚眼の `DIRECTION` (BULGE/PINCH)、`CURVE`、日本語/英語切替を維持。
- Service Worker のキャッシュ名と読み込みURLをv6へ更新。
- ヘッダーに `WEB EDITION / V6` と表示。

## GitHub Pages

ZIPを展開し、ファイルをリポジトリ直下にアップロードしてCommit。`README.md`は任意です。
ホーム画面のPWAを終了して再起動し、ヘッダーがV6になったことを確認してください。更新が残る場合はSafariで公開URLを再読み込みしてください。

実機動作・元SwiftUI版との完全一致は未検証です。
