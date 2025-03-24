( ()=>{
    // template에 표시될 데이터
    let data = [
        {"name" : "홍길동", "address" : "서울", "email" : "hong@"},
        {"name" : "김씨", "address" : "부산", "email" : "kim@"},
        {"name" : "이씨", "address" : "대구", "email" : "lee@"},
        {"name" : "박씨", "address" : "인천", "email" : "park@"},
        {"name" : "남씨", "address" : "강릉", "email" : "nam@"},
    ]

    let tempBody = document.querySelector("#template_body");

    let url = "/html/external.html";
    let saveTemplate = localStorage.getItem(url);
    if(saveTemplate){
        load(tempBody, saveTemplate);
    }else{
        fetch(url)
        .then(resp => resp.text())
        .then(html=>{
            localStorage.setItem(url, html);
            load(tempBody, html);
        })
    }
    

    function load(templateBody, cacheTemplate){
        let parser = new DOMParser();
        let externalDoc = parser.parseFromString(cacheTemplate, "text/html");
        let template = externalDoc.querySelector(".template");

        data.forEach( d=> {
            // template clone
            let clone = template.content.cloneNode(true);
            clone.querySelector(".name").textContent = d.name;
            clone.querySelector(".address").textContent = d.address;
            clone.querySelector(".email").textContent = d.email;
            templateBody.append(clone);
        })
    }

})()