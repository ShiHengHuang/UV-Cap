  var data = {}
  var data1 = {}
  var data2 = {}
  var jin
  var wei
  // fetch 裡面的動作是非同步的
  // 也就是說 fetch 會先去抓他的資料
  // 然後繼續往下做後面的事情
  // 等 fetch 抓到資料後才跑 then 裡面的事情
  fetch('https://api.thingspeak.com/channels/286506/fields/1.json', {
      method: 'GET'
    })
    .then(res => {
      // 這邊是把拿到的資料轉換成 json 格式
      return res.json()
    })
    .then(res => {
      data = res
      // 這邊會顯示 data = 你要的結果
    //  console.log(`data = ${JSON.stringify(data)}`)
      console.log(data["feeds"][1]["created_at"])
      console.log(data["feeds"][1]["field1"])
     

    })
    .catch(err => {
      console.log(err)
    })
  
   fetch('https://api.thingspeak.com/channels/286506/fields/2.json', {
      method: 'GET'
    })
    .then(res => {
      // 這邊是把拿到的資料轉換成 json 格式
      return res.json()
    })
    .then(res => {
      data1 = res
      // 這邊會顯示 data = 你要的結果
      //console.log(`data1 = ${JSON.stringify(data1)}`)
	    console.log(data1["feeds"][1]["created_at"])
		console.log(data1["feeds"][1]["field2"])
        jin=parseFloat(data1["feeds"][1]["field2"])
		

    })
    .catch(err => {
      console.log(err)
    })
	
	
	fetch('https://api.thingspeak.com/channels/286506/fields/3.json', {
      method: 'GET'
    })
    .then(res => {
      // 這邊是把拿到的資料轉換成 json 格式
      return res.json()
    })
    .then(res => {
      data2 = res
      // 這邊會顯示 data = 你要的結果
     // console.log(`data2 = ${JSON.stringify(data2)}`)
      console.log(data2["feeds"][1]["created_at"])
	  console.log(data2["feeds"][1]["field3"])
	  wei=parseFloat(data2["feeds"][1]["field3"])

    })
    .catch(err => {
      console.log(err)
    })


    