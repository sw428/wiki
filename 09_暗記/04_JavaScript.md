# JavaScript単語帳

## JS-001

### 問題
文書内で`.item`に最初に一致する要素を1つ取得するには？

### 答え
`document.querySelector('.item')`

### 参照
[DOMとイベント](../02_基礎/02_JS/02_DOMとイベント.md)

## JS-002

### 問題
文書内で`.item`に一致するすべての要素を取得するには？

### 答え
`document.querySelectorAll('.item')`

## JS-003

### 問題
変数`element`に入っている要素へ`active`クラスを追加するには？

### 答え
`element.classList.add('active')`

## JS-004

### 問題
変数`element`に入っている要素がクリックされたとき、関数`handler`を実行するには？

### 答え
`element.addEventListener('click', handler)`

## JS-005

### 問題
変数`element`に入っている要素の`active`クラスを、あれば外し、なければ付けるには？

### 答え
`element.classList.toggle('active')`
