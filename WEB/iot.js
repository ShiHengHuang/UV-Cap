  var data = {}
  var data1 = {}
  var data2 = {}
  var jin
  var wei
  // fetch �̭����ʧ@�O�D�P�B��
  // �]�N�O�� fetch �|���h��L�����
  // �M���~�򩹤U���᭱���Ʊ�
  // �� fetch ����ƫ�~�] then �̭����Ʊ�
  fetch('https://api.thingspeak.com/channels/286506/fields/1.json', {
      method: 'GET'
    })
    .then(res => {
      // �o��O�⮳�쪺����ഫ�� json �榡
      return res.json()
    })
    .then(res => {
      data = res
      // �o��|��� data = �A�n�����G
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
      // �o��O�⮳�쪺����ഫ�� json �榡
      return res.json()
    })
    .then(res => {
      data1 = res
      // �o��|��� data = �A�n�����G
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
      // �o��O�⮳�쪺����ഫ�� json �榡
      return res.json()
    })
    .then(res => {
      data2 = res
      // �o��|��� data = �A�n�����G
     // console.log(`data2 = ${JSON.stringify(data2)}`)
      console.log(data2["feeds"][1]["created_at"])
	  console.log(data2["feeds"][1]["field3"])
	  wei=parseFloat(data2["feeds"][1]["field3"])

    })
    .catch(err => {
      console.log(err)
    })


    