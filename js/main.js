'use strict';


import data from './data.json' assert {type:'json'};

const tooltip = document.querySelector("[data-tooltip]");
const chartBars = document.querySelectorAll("[data-chart-bar]");
let maxDayAmount = 0;
const charBarsHeight = [];

const addEventOnElem =(elem, type, callback)=> {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}


for (let i = 0; i < data.length; i++) {
  if (data[i].amount > maxDayAmount) {
    maxDayAmount = data[i].amount;
  }
}
for (let i = 0; i < data.length; i++) {
	const dayAmount = data[i].amount;
	if(dayAmount>=50){
		chartBars[i].style=`background-color:hsl(var(--col-cyan))`;
	}

}

const setChartBarsHeight =(height)=>{
  for (let i = 0; i < height.length; i++) {
    chartBars[i].style.transform = `scaleY(${height[i] / 100})`;
  }
}

for (let i = 0; i < data.length; i++) {
  const dayAmount = data[i].amount;
  const percentOfNum = dayAmount / maxDayAmount * 100;

  charBarsHeight.push(percentOfNum);
}

setChartBarsHeight(charBarsHeight);

const setTooltipPos =(top, left, chartBarWidth)=> {
  const tooltipHeight = tooltip.offsetHeight+5;
  const gap = 8;

  tooltip.style.top = `${top - tooltipHeight - gap}px`;
  tooltip.style.left = `${left + chartBarWidth / 2}px`;
}

const chartBarOnHover = function () {
  tooltip.classList.add("active");

  const barTopPos = this.getBoundingClientRect().top;
  const barLeftPos = this.getBoundingClientRect().left;
  const barWidth = this.offsetWidth;

  setTooltipPos(barTopPos, barLeftPos, barWidth);
}

addEventOnElem(chartBars, "mouseover", chartBarOnHover);


const hideTooltip =()=> {
  tooltip.classList.remove("active");
}

addEventOnElem(chartBars, "mouseleave", hideTooltip);


const addTooltipValue = function () {
  for (let i = 0; i < data.length; i++) {
    if (data[i].day === this.dataset.chartBar) {
      tooltip.innerHTML = '$'+data[i].amount.toString();
      break;
    }
  }
}

addEventOnElem(chartBars, "mouseover", addTooltipValue);