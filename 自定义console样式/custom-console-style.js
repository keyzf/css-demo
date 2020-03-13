function log(title,message,color){
  console.log(`%c ${title} ->`,`background:${color};color:#fff;font-weight:700;border-radius:3px;padding:1px 5px 1px 0;`,message)

}

log('哈哈哈', [1,2,3,4,5], '#2db7f5')
log('重要', [1,2,3,4,5], 'red')
log('log', [1,2,3,4,5], '#666')