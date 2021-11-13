## 2021TheF2eWeek1 - 台灣旅遊景點導覽


### 簡介&心得
這次在公司忙碌及接案的忙碌壓力下完成了第一週的挑戰，
與以往不同的是這次的 API 是有 Odata 的查詢功能，
所以篩選的功能不同以往是透過 URL 做而不是 Js 的 Array 篩選，
篩選功能透過 Vue Router 來做 `/Seacher/城市/類別/關鍵字`
抓到 `$router.params` 後再來拼 API 的 Odata 網址。

這次練習未完成的是公車查詢的部分，這部分將放到 Week2 來做

### 以前未使用的 plugin

1. vue-infinite-loading
無限下拉滾動的 plugin，擁有很完整的 `props` 及 `slot`，操作簡單且具有中文說明。
官網: <a href="https://peachscript.github.io/vue-infinite-loading/">vue-infinite-loading</a>

2. lottie-vuejs
可直接渲染設計師提供從AE匯出的`json`檔，也有相當完整的 `props` 可以使用。
官網: <a href="https://github.com/SuperbuffNL/lottie-vuejs">lottie-vuejs</a>

