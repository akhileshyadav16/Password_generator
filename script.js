const inputSlider = document.querySelector('[data-lengthSlider]');
const copiedBtn = document.querySelector('[copy-btn]');
const lengthCount = document.querySelector('[length-count]');
const generatebtn = document.querySelector('[generate-password]');

const UpperCheck = document.querySelector('[first-check]');
const LowerCheck = document.querySelector('[second-check]');
const NumbersCheck = document.querySelector('[third-check]');
const CharCheck = document.querySelector('[forth-check]');
const passwordDisplay = document.querySelector('[pass-display]')
const copyMessage = document.querySelector('[data-copyMsg]');

const allcheckBox = document.querySelectorAll("input[type=checkbox]");

lengthCount.innerHTML = inputSlider.value;
inputSlider.oninput = ()=>{
    lengthCount.innerHTML = inputSlider.value;
    //handleCheckBoxChange();
};

let getRndInteger = (min,max)=>{
    return Math.floor(Math.random()*(max-min)+min);
}

let RandomNumber = ()=>{
    return getRndInteger(0,9);
}

let RandomUpperCase = ()=>{
    let a = getRndInteger(65,91);
    console.log(a)
    return String.fromCharCode(a);
}

let RandomLowerCase = ()=>{
    return String.fromCharCode(getRndInteger(97,123));
}

let specialChar = '~@`!#$%^&*()-_+={[}]:;">.,<|';

let RandomSpecial = ()=>{
    return specialChar.charAt(getRndInteger(0,specialChar.length));
}

const indicate = document.querySelector('[indicator]');
function setIndicator(color){
    indicate.style.backgroundColor = color;
}

let password = "";

let checkCount = 0;

function calcStrength(){
    let hasUpper = false;
    let haslower = false;
    let hasNum = false;
    let hasSym = false;
    if(UpperCheck.checked) hasUpper = true;
    if(LowerCheck.checked) haslower = true;
    if(NumbersCheck.checked) hasNum = true;
    if(CharCheck.checked) hasNum = true;

    if(hasUpper && haslower && (hasNum || hasSym) && password.length >= 8){
        setIndicator("#0f0");
    }
    else if((haslower || hasUpper) && (hasNum || hasSym) && password.length>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

function shufflepassword(array){
    //fisher yates method
    for(let i = array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str+=el));
    return str;
}

async function copyContent(){
try{
    await navigator.clipboard.writeText(passwordDisplay.value);
}catch(e){
    copyMessage.innerHTML = 'Failed!'
}
    copyMessage.innerHTML = 'copied';
    copyMessage.classList.add('active');
    setTimeout(function(){
        copyMessage.classList.remove('active');
    },2000);
}

copiedBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});


function handleCheckBoxChange(){
    checkCount = 0;
    allcheckBox.forEach( (checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    
}

allcheckBox.forEach( (checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange());
})


generatebtn.addEventListener('click',() => {
    if(checkCount<=0) return;
    password="";
    let functionArr = [];

    if(UpperCheck.checked)
        functionArr.push(RandomUpperCase)
    if(LowerCheck.checked)
        functionArr.push(RandomLowerCase);
    if(NumbersCheck.checked)
        functionArr.push(RandomNumber);
    if(CharCheck.checked)
        functionArr.push(RandomSpecial);

    
    for(let i=0;i<functionArr.length ; i++){
        password+=functionArr[i]();
    }
    let temp = password.length;
    for(let i=0;i<inputSlider.value-temp;i++){
        let randomIndex = getRndInteger(0,functionArr.length);
        password+=functionArr[randomIndex]();
    }
    console.log(password);
    // shuffle password
    password = shufflepassword(Array.from(password));

    // show in ui
    passwordDisplay.value = password;

    //calculate strength
    calcStrength();
})

