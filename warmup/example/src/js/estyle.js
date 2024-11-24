const categories = {
  "PPC": {
      "ppc0": {
            "name": "WarmUp",
            "description": "给定两个大整数a和b，试求其和作为flag（详见example.txt）。",
            "flag_md5": "968132163c598d7e08dd1b9e00c1bd6a",
            "attachment":
                [
                  "./attachment/ppc0/example.txt",
                  "./attachment/ppc0/add.c",
                  "./attachment/ppc0/data.in"
                ],
            "writeup": "./writeup/ppc0-wp",
            "submit": true
      }
  },
  "Crypto": {
      "crypto0": {
          "name": "WarmUp",
          "description": "Factor it and get the flag.",
          "flag_md5": "644fb25498d8a7b62497946ad3de78b3",
          "attachment": 
              [
                  "./attachment/crypto0/output.txt",
                  "./attachment/crypto0/WarmUp.py"
              ],
          "writeup": "./writeup/crypto0-wp",
          "submit": true
      }
  },
  "Misc":{
      "misc0": {
          "name": "WarmUp",
          "description": "Check the alphabetical order of the following encoded flag: <br> xfdwiodjv{zhofrph_wr_plvf}",
          "flag_md5": "ea86bce16f51b1e05d2178b8da7ba3b5",
          "attachment":
              [

              ],
          "writeup": "./writeup/misc0-wp",
          "submit": true
      }
  },
  "Reverse":{
      "re0": {
          "name": "WarmUp",
          "description": "Reverse the file and get the flag.",
          "flag_md5": "0b656bfd1920926caa6b94310709a8b4",
          "attachment":
              [
                "./attachment/re0/warmup",
              ],
          "writeup": "./writeup/re0-wp",
          "submit": true
      }
  },
  "Pwn": {
      "pwn0": {
            "name": "WarmUp",
            "description": "Stack Overflow and get the flag.",
            "flag_md5": "968132163c598d7e08dd1b9e00c1bd6a",
            "attachment":
                [
                  "./attachment/pwn0/overflow3211"
                ],
            "writeup": "./writeup/pwn0-wp",
            "submit": false
      }
  },
};

// const categories = {};

// fetch('./src/data/data.json')
//     .then(response => response.json())
//     .then(data => {
//       loadPage(data);
//     })
//     .catch(error => console.error('Error:', error));

function generateCategories(ctfs) {
  const categoriesContainer = document.getElementById('categories');
  for (const category in ctfs) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    categoryDiv.innerHTML = `
      <h2>${category}</h2>
    `;
    for (const challenge in ctfs[category]) {
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card';
      cardDiv.id = `card-${challenge}`;
      const challengeData = ctfs[category][challenge];
      cardDiv.innerHTML = `
        <h3>${challengeData.name}</h3>
        <p>${challengeData.description}</p>
      `;
      if (challengeData.attachment.length > 0) {
        const attachmentsDiv = document.createElement('div');
        challengeData.attachment.forEach((file) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = file;
          downloadLink.className = 'download-link';
          downloadLink.textContent = `下载附件: ${file.split('/').pop()}`;
          downloadLink.setAttribute('download', file.split('/').pop());
          attachmentsDiv.appendChild(downloadLink);
        });
        cardDiv.appendChild(attachmentsDiv);
      }
      if (challengeData.submit) {
        const submitForm = document.createElement('div');
        submitForm.className = 'submit-form';
        submitForm.innerHTML = `
          <input type="text" id="flag-${challenge}" placeholder="请输入你的flag">
          <button onclick="validateFlag('${challenge}', '${category}')" id="submit-${challenge}">提交</button>
          <p id="result-${challenge}"></p>
        `;
        cardDiv.appendChild(submitForm);
      }
      categoryDiv.appendChild(cardDiv);
      const writeupLink = document.createElement('a');
      writeupLink.href = ctfs[category][challenge]['writeup'];
      writeupLink.textContent = '点击这里查看解题思路（WriteUp）';
      writeupLink.style.display = 'block';
      cardDiv.appendChild(writeupLink);
    }
    categoriesContainer.appendChild(categoryDiv);
  }
}

function validateFlag(challenge, category) {
  var flag = document.getElementById(`flag-${challenge}`).value;
  var result = document.getElementById(`result-${challenge}`);
  var correctHash = categories[category][challenge]["flag_md5"];
  var hash = CryptoJS.MD5(flag).toString();

  if (hash === correctHash) {
    result.textContent = 'Flag正确！';
    result.className = 'success';
    document.getElementById(`card-${challenge}`).className = 'card correct';
    var tpl = document.getElementById(`flag-${challenge}`);
    var tb = document.getElementById(`submit-${challenge}`);
    tpl.parentElement.removeChild(tpl);
    tb.parentElement.removeChild(tb);
    StoreSoluted(challenge);
  } else {
    result.textContent = 'Flag错误，请再试一次。';
    result.className = 'error';
  }
}

function getSoluted(challenge){
  var result = document.getElementById(`result-${challenge}`);
  var ifSoluted = localStorage.getItem(challenge);
  if(ifSoluted == "soluted"){
    result.textContent = 'Flag正确！';
    result.className = 'success';
    document.getElementById(`card-${challenge}`).className = 'card correct';
    var tpl= document.getElementById(`flag-${challenge}`);
    var tb = document.getElementById(`submit-${challenge}`);
    tpl.parentElement.removeChild(tpl);
    tb.parentElement.removeChild(tb);
  }
}

function StoreSoluted(challenge){
  localStorage.setItem(challenge, "soluted");
}

// function cleanSoluted(){
//   localStorage.clear();
// }

function loadPage(data){
  generateCategories(data);
  for(var i in data){
    for(var j in data[i]){
      getSoluted(j);
    }
  }
}

window.onload = function() {
  loadPage(categories);
};
