(function listner (){
document.getElementById('but').addEventListener("click", function(){result("exit","pre","arm",0)}); 
document.getElementById('write').addEventListener("click", scribbler); 
document.getElementById('exit').addEventListener("change", function(){check(this.value,1,checkTimer(1000000),this.id)});
document.getElementById('entry').addEventListener("change", function(){check(this.value,1,checkTimer(1),this.id)});
document.getElementById('exit').addEventListener("keyup", function(){validate(this)});
document.getElementById('entry').addEventListener("keyup", function(){validate(this)});
document.getElementById('pre').addEventListener("keyup", function(){validate(this)});
document.getElementById('arm').addEventListener("keyup", function(){validate(this)});

document.getElementById('pre').addEventListener("change", function(){changer(0,"pre","arm",0)});
document.getElementById('arm').addEventListener("change", function(){changer(1,"pre","arm",0)});

document.getElementById("pre").style.display="none";
document.getElementById("arm").style.display="none";

document.getElementById('exit1').addEventListener("change", function(){check(this.value,1,checkTimer(1000000),this.id)});
document.getElementById('exit1').addEventListener("change", function(){result("exit1","pre1","arm1",1)});
document.getElementById('exit1').addEventListener("keyup", function(){validate(this)});
document.getElementById('pre1').addEventListener("keyup", function(){validate(this)});
document.getElementById('arm1').addEventListener("keyup", function(){validate(this)});

document.getElementById('pre1').addEventListener("change", function(){changer(0,"pre1","arm1",1)});
document.getElementById('arm1').addEventListener("change", function(){changer(1,"pre1","arm1",1)});

document.getElementById("pre1").style.display="none";
document.getElementById("arm1").style.display="none";

document.getElementById('exit2').addEventListener("change", function(){check(this.value,1,checkTimer(1000000),this.id)});
document.getElementById('exit2').addEventListener("change", function(){result("exit2","pre2","arm2",2)});
document.getElementById('exit2').addEventListener("keyup", function(){validate(this)});
document.getElementById('pre2').addEventListener("keyup", function(){validate(this)});
document.getElementById('arm2').addEventListener("keyup", function(){validate(this)});

document.getElementById('pre2').addEventListener("change", function(){changer(0,"pre2","arm2",2)});
document.getElementById('arm2').addEventListener("change", function(){changer(1,"pre2","arm2",2)});

document.getElementById("pre2").style.display="none";
document.getElementById("arm2").style.display="none";

document.getElementById('write').disabled = true;
})();
var pre1,arr1,pre2,arr2,pre3,arr3;

//Проверка номера тайиера для выбора частоты
function checkTimer(c){
  let a, b;
  a = document.getElementById('timer').value;
  if(a==1 || a==8 || a==9 || a==10 || a==11) b = 168;
  else b = 84;
  return b*c;
}

//Запрет ввода букв
function validate(inp) {
    inp.value = inp.value.replace(/[^\d]*/g, '');
}
//Проверка вводимой величины
function check(value,min,max,id) {
    if (+value < +min || +value > +max) {
        alert("Проверьте ввод");
        var z = document.getElementById(id);
        z.value=(((+max)+(+min))/2).toFixed(0);
    }
}
//Получение значения из input
function get (id){
   var x =document.getElementById(id);
   return parseFloat(x.value);
}
//Проверка на целочисленность
function isInteger(num) {
  return (num ^ 0) === num;
}
//Расчет ARR and Presceller
function result(ae,ap,aa,an){
    var pres, arms;
    var n = Math.round((+get("entry"))*1000000/(+get(ae)));
    n >= 1 ? arms=n : arms = 1;
    pres=1;
    var massA = [2,3,5,7,11,13,17,19,23];
    for(;;){
       	for (var i = 0; i<massA.length-1; i++){
          if(arms<649000)break;
       		if (isInteger(arms/massA[i])){
       			arms=arms/massA[i];
        		pres=pres*massA[i];
        		i = -1;
       		}
       	}
       	if(arms<64999)break;
        else arms=arms-1;
    }
    document.getElementById(ap).style.display="inline"; 
    document.getElementById(aa).style.display="inline"; 
    document.getElementById(ap).value = pres-1;
    document.getElementById(aa).value = arms-1;
    switch (an){
      case 0:pre1=pres-1;arr1=arms-1;document.getElementById('write').disabled = false;break;
      case 1:pre2=pres-1;arr2=arms-1;break;
      case 2:pre3=pres-1;arr3=arms-1;break;
    }
  }
//Сохранение соотношения ARR and Presceller
function changer(toog,ap,aa,an){
  var ppp, aaa, papapa;
  switch (an){
      case 0:ppp=pre1;aaa=arr1;break;
      case 1:ppp=pre2;aaa=arr2;break;
      case 2:ppp=pre3;aaa=arr3;break;
    }
  if(aaa<1)aaa=1;
  if(ppp<1)ppp=1;
  papapa = ppp*aaa;
  switch (toog){
    case 0: 
      let b;
      if(get(ap)>65355) document.getElementById(ap).value=65355;
      b=papapa/(get(ap)<1?1:get(ap));
      if(b>65355) {
      	b=65355;
      	document.getElementById(ap).value = Math.round(papapa/b);
      }
      document.getElementById(aa).value = Math.round(b);
      ppp=Math.round(get(ap));
      aaa=Math.round(b);
      break;
    case 1:
      let a;
      if(get(aa)>65355) document.getElementById(aa).value=65355;
      a=papapa/(get(aa)<1?1:get(aa));
      if(a>65355) {
      	a=65355;
      	document.getElementById(aa).value = Math.round(papapa/a);
      }
      document.getElementById(ap).value = Math.round(a);
      ppp=Math.round(a);
      aaa=Math.round(get(aa));
      break;
  }
  switch (an){
      case 0:pre1=ppp;arr1=aaa;break;
      case 1:pre2=ppp;arr2=aaa;break;
      case 2:pre3=ppp;arr3=aaa;break;
    }
  if(papapa==1){
     document.getElementById(aa).value = 0;
     document.getElementById(ap).value = 0;
    }
}
//Вывод текста (в случае вывода в одну строку обурнуть текст в <pre></pre>
function scribbler(){
  let textArea = document.getElementById("code");
  let a,b,c;
  if(checkTimer(1)==84) a = "APB1";
  else a = "APB2";
  b = document.getElementById('timer').value;
  switch (b){
    case 1: c = "TIM1_UP_TIM10"; break;
    case 2: c = "TIM2"; break;
    case 3: c = "TIM3"; break;
    case 4: c = "TIM4_TIM10"; break;
    case 5: c = "TIM5"; break;
    case 6: c = "TIM6_DAC"; break;
    case 7: c = "TIM7"; break;
    case 8: c = "TIM8_UP_TIM13"; break;
    case 9: c = "TIM1_BRK_TIM9"; break;
    case 10: c = "TIM1_UP_TIM10"; break;
    case 11: c = "TIM1_TRG_COM_TIM11"; break;
    case 12: c = "TIM8_BRK_TIM12"; break;
    case 13: c = "TIM8_UP_TIM13"; break;
    case 14: c = "TIM8_TRG_COM_TIM14"; break;
  }
  textArea.innerHTML = `
#include "stm32f4xx.h"
#include "stm32f4xx_gpio.h"
#include "stm32f4xx_rcc.h"
#include "stm32f4xx_tim.h"
#include "misc.h"
#include "stm32f4xx_exti.h"
#include "stm32f4xx_syscfg.h"
#include "system_stm32f4xx.h"
static void initGPIO();
static void initTIM();
void Delay(volatile uint32_t tick) {
  for (uint32_t i = 0; i < tick; i++);
}
void Mode0(void);
void Mode1(void);
void Mode2(void);

uint8_t interruptState = 0;
uint16_t arr = ${get('arm')};
uint16_t prs = ${get('pre')};
uint8_t update = 0;
uint32_t count = 0;
int main(void) {
  SystemInit();
  initGPIO();
  initTIM();

  RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOA, ENABLE);
  RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOD, ENABLE);
  RCC_AHB2PeriphClockCmd(RCC_APB2Periph_SYSCFG, ENABLE);

  GPIO_InitTypeDef GPIO_InitStruct;
  GPIO_StructInit(&GPIO_InitStruct);
  GPIO_InitStruct.GPIO_Pin = GPIO_Pin_12 ;
  GPIO_InitStruct.GPIO_Mode = GPIO_Mode_OUT;
  GPIO_InitStruct.GPIO_PuPd = GPIO_PuPd_NOPULL;
  GPIO_InitStruct.GPIO_OType = GPIO_OType_PP;
  GPIO_InitStruct.GPIO_Speed = GPIO_Speed_2MHz;
  GPIO_Init(GPIOD, &GPIO_InitStruct);

  GPIO_InitStruct.GPIO_Mode = GPIO_Mode_IN;
  GPIO_InitStruct.GPIO_Pin = GPIO_Pin_0;
  GPIO_Init(GPIOA, &GPIO_InitStruct);

  SYSCFG_EXTILineConfig(EXTI_PortSourceGPIOA, EXTI_PinSource0);

  EXTI_InitTypeDef EXTI_InitStruct;
  EXTI_StructInit(&EXTI_InitStruct);
  EXTI_InitStruct.EXTI_Mode = EXTI_Mode_Interrupt;
  EXTI_InitStruct.EXTI_Trigger = EXTI_Trigger_Rising;
  EXTI_InitStruct.EXTI_Line = EXTI_Line0;
  EXTI_InitStruct.EXTI_LineCmd = ENABLE;
  EXTI_Init(&EXTI_InitStruct);

  NVIC_InitTypeDef NVIC_InitStruct;
  NVIC_InitStruct.NVIC_IRQChannel = EXTI0_IRQn;
  NVIC_InitStruct.NVIC_IRQChannelPreemptionPriority = 0x02;
  NVIC_InitStruct.NVIC_IRQChannelSubPriority = 0x01;
  NVIC_InitStruct.NVIC_IRQChannelCmd = ENABLE;
  NVIC_Init(&NVIC_InitStruct);

  uint8_t mode = 0;

    while(1)
    {
    if (interruptState == 1) {
      Delay(50000);
      uint8_t ButtonState = GPIO_ReadInputDataBit(GPIOA, GPIO_Pin_0);
      if (ButtonState == 1) {
        mode++;
        if (mode > 2)
          mode = 0;
        if (mode == 0)
          Mode0();
        if (mode == 1)
          Mode1();
        if (mode == 2)
          Mode2();
        update = 1;
      }
      interruptState = 0;
    }
  }
}

static void initGPIO() {
  RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOD, ENABLE);

  GPIO_InitTypeDef gpioInitStruct;
  GPIO_StructInit(&gpioInitStruct);
  gpioInitStruct.GPIO_Pin = GPIO_Pin_12;
  gpioInitStruct.GPIO_Mode = GPIO_Mode_OUT;
  gpioInitStruct.GPIO_Speed = GPIO_Speed_2MHz;
  gpioInitStruct.GPIO_OType = GPIO_OType_PP;
  gpioInitStruct.GPIO_PuPd = GPIO_PuPd_NOPULL;
  GPIO_Init(GPIOD, &gpioInitStruct);
}

static void initTIM() {
  RCC_${a}PeriphClockCmd(RCC_${a}Periph_TIM${b}, ENABLE);

  TIM_TimeBaseInitTypeDef timInitStruct;
  TIM_TimeBaseStructInit(&timInitStruct);
  timInitStruct.TIM_Period = ${get('arm')};
  timInitStruct.TIM_Prescaler = ${get('pre')};
  timInitStruct.TIM_ClockDivision = TIM_CKD_DIV1;
  timInitStruct.TIM_CounterMode = TIM_CounterMode_Up;
  timInitStruct.TIM_RepetitionCounter = 0;
  TIM_TimeBaseInit(TIM${b}, &timInitStruct);
  TIM_ITConfig(TIM${b}, TIM_IT_Update, ENABLE);

  NVIC_InitTypeDef nvicStruct;
  nvicStruct.NVIC_IRQChannel = ${c}_IRQn;
  nvicStruct.NVIC_IRQChannelPreemptionPriority = 1;
  nvicStruct.NVIC_IRQChannelSubPriority = 1;
  nvicStruct.NVIC_IRQChannelCmd = ENABLE;
  NVIC_Init(&nvicStruct);

  TIM_Cmd(TIM${b}, ENABLE);
}

void Mode0(void) {
  prs = ${get('pre')};
  arr = ${get('arm')};
}

void Mode1(void) {
  prs = ${document.getElementById('pre1').value?get('pre1'):get("pre")};
  arr = ${document.getElementById('arm1').value?get('arm1'):get("arm")};
}
void Mode2(void) {
  prs = ${document.getElementById('pre2').value?get('pre2'):get("pre")};
  arr = ${document.getElementById('arm2').value?get('arm2'):get("arm")};
}

void EXTI0_IRQHandler(void) {
  if (EXTI_GetITStatus(EXTI_Line0) != RESET) {
    interruptState = 1;
    EXTI_ClearITPendingBit(EXTI_Line0);}
  }
void ${c}_IRQHandler() {
  if (TIM_GetITStatus(TIM${b}, TIM_IT_Update) != RESET) {
    TIM_ClearITPendingBit(TIM${b}, TIM_IT_Update);

    if (update) {
      TIM_PrescalerConfig(TIM${b}, prs, TIM_PSCReloadMode_Update);
      TIM_SetAutoreload(TIM${b}, arr);
      update = 0;
    }
    GPIO_ToggleBits(GPIOD, GPIO_Pin_12);
  }
}
`;
}


















