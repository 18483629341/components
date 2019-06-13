/** 1.判断是否是一个数组 **/

function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]';
}
isArray([1, 2, 3])

/** 2.判断是否是一个方法 **/

function isFunction(fn) {
	//return Object.prototype.toString.call(fn) ==='[object Function]';//test ok
	//return fn.constructor==Function;//test ok
	//return fn instanceof Function;//test ok
	console.log(Object.prototype.toString.call(fn), fn.constructor, typeof (fn));
	return typeof (fn) == 'function' //test ok
	//typeof用以获取一个变量或者表达式的类型，typeof一般只能返回如下几个结果：
	//number,boolean,string,function（函数）,object（NULL,数组，对象）,undefined。
}
isFunction(aa);
function aa() { }

/** 3.数组去重，只考虑数组中元素为数字或者字符串 **/

function removeRup(arr) {
	var arrs = [];
	for (let i in arr) {
		if (arrs.indexOf(arr[i]) == -1) {
			arrs.push(arr[i]);
		}
	}
	return arrs;
}
removeRup([2, 3, 2, 6, 7]);

/** 4.去除字符串空格(包含三种情况) **/

function trim(str) {
	return str.replace(/^[' '||' ']*/i, '').replace(/[' '||'  ']$/i, ''); //去除首尾的空格
	// return str.replace(/\s/g,'');//去除所有的空格
}
trim(' li li  ');

/**
 * 判断格式是否为邮箱
 *  @param emailStr string
 */
function isEmail(emailStr) {
	const reg = /^[a-zA-Z0-9]+([._-]*[a-zA-Z0-9]*)*@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/;
	return reg.test(emailStr);
}
isEmail('714402934@qq.com')

/** 6.判断是否为手机 **/

function isPhone(phone) {
	var reg = /^1\d{10}$/;
	return reg.test(phone);
}
isPhone(18483629341);

/** 7.获取一个对象里面所有元素的数量 **/

function getObjectLength(obj) {
	var length = 0;
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			length++;
		}
	}
	return length
}
getObjectLength({ name: "lisa", age: 11 });

/** 8.获取元素相对于浏览器窗口的位置，返回一个{x,y}对象 **/

function getPosition(element) { //经典
	var offsetx = 0;
	var offsety = 0;
	//var ele=document.querySelector(element);
	offsetx += element.offsetLeft;
	offsety += element.offsetTop;
	if (element.offsetParent != null) {
		getPosition(element.offsetParent)
	}
	return {
		Left: offsetx,
		top: offsety
	}
}
var listBox = document.getElementById('listBox');
getPosition(listBox);

/* 9.判断某个字母在字符串中出现的次数 */

function getCount(str, a) {
	var count = 0;
	var strArr = str.split('');
	strArr.forEach(element => {
		if (element == a) {
			count++;
		}
	});
	return count
}
var str = 'To be, or not to be, that is the question.'
getCount(str, 'a');

/* 10.计算出数组中出现次数最多的元素 */

function getArrMost(arr) {
	var newArr = removeRup(arr);
	var countArr = [];
	newArr.forEach(element => {
		var count = 0
		arr.forEach(e => {
			if (element == e) {
				count++;
			}
		});
		countArr.push(count);
	});

	var j = 0;
	var mostKey = countArr[0];
	for (let i = 1; i < countArr.length; i++) {
		if (mostKey < countArr[i]) {
			mostKey = countArr[i];
			j = i;
		}
	}

	return newArr[j];
}
var arr4 = [1, 2, 3, 4, 2, 3, 1, 3, 2, 4, 6];
getArrMost(arr4);

/* 11.数组过滤（搜索） */
function search(str, arr) {
	return arr.filter(
		function (el) {
			return el.toLowerCase().indexOf(str.toLowerCase()) > -1;
		}
	)
}
search('Ap', ['apple', 'banana', 'graPes', 'mango', 'orange']);

/* 12.深度克隆 对象（针对 对象 或 对象数组 或 数组） 经典 */

function cloneObj(origin, target) {
	console.log()
	var target = target || {};
	if (origin instanceof Array) {
		target = [];
	} else if (origin == null) {//null或者undefined时
		target = origin;
	}
	for (var key in origin) { //此方法即可遍历对象，也可遍历数组
		target[key] = typeof val === 'object' ? cloneObj(origin[key], target[key]) : origin[key];
		//typeof val==='object' 数组和对象以及null
	}
	return target;
}

cloneObj([{ name: "lisa" }, { job: "worker" }], newC); //同左
cloneObj({ name: [1, 2, 3], job: "worker", tasks: { '学霸': 'lilei', '班长': '刘星' } }, newC); //同左
cloneObj({ name: [1, 2, 3], job: null, tasks: { '学霸': 'lilei', '班长': '刘星' } }, newC); //同左
cloneObj([1, 2, 3], newC); //[1,2,3]
cloneObj(null, newC); //null
cloneObj(undefined, newC); //undefined

/* 13.求数组最大值和最小值 */
Array.prototype.max = function () {
	return Math.max.apply({}, this)
}

Array.prototype.min = function () {
	return Math.min.apply({}, this)
}

console.log([1, 5, 2].max())

/* 14.json数组去重 */

function UniquePay(paylist, key) {
	//功能介绍，若参数key属性一致时，  去重后只取最前面那一个
	var payArr = [paylist[0]];
	for (var i = 1; i < paylist.length; i++) {
		var payItem = paylist[i];
		var repeat = false;
		for (var j = 0; j < payArr.length; j++) {
			if (payItem[key] == payArr[j][key]) {
				repeat = true;
				break;
			}
		}
		if (!repeat) {
			payArr.push(payItem);
		}
	}
	return payArr;
}
var jsonL = [{ key: "lucy", so: "hihi" }, { key: "lucy", lo: "miki" }, { key: "joyce" }, { key: "lisa" }, { key: "tomes" }, { key: "lisa" }];
UniquePay(jsonL, 'key');

/* 15.对比多个数组，取出交集 */

Array.intersect = function () {
	var result = new Array();
	var obj = {};
	for (var i = 0; i < arguments.length; i++) {
		for (var j = 0; j < arguments[i].length; j++) {
			var str = arguments[i][j];
			if (!obj[str]) {
				obj[str] = 1;
			} else {
				obj[str]++;
				if (obj[str] == arguments.length) {
					result.push(str);
				}
			}//end else
		}//end for j
	}//end for i
	return result;
}
Array.intersect([5, 6, 7, 4], [2, 3, 4]);

/* 16.数组和对象比较。取出对象的key和数组元素相同的 */

//功能介绍，以数组的值作为属性值，在obj查找含相应的属性的值
function getObjByarr(obj, arr) {
	var newobj = {};
	for (var item in obj) {
		if (arr.includes(item)) {
			newobj[item] = obj[item]
		}
	}
	return newobj
}
var arr1 = ['F00006', 'F00007', 'F00008'];
var obj1 = { 'F00006': [{ 'id': 21 }], 'F00007': [{ 'id': 11 }] }
getObjByarr(obj1, arr1);

// 、、判断数组是否包含某个元素
var arrb = ['niu', 'zhu', 'gou'];
arrb.includes('zhu');

//1.使用setInterval()的定时器会把事件运行的时间也包含在内，
//如果要精确算定时两个任务之间的时间，可以使用setTimeout()替换。
//2.当异步事件发生时，如mouse click, a timer firing, or an XMLHttpRequest completing
//（鼠标点击事件发生、定时器触发事件发生、XMLHttpRequest完成回调触发等），将他们放入执行队列，等待当前代码执行完成。
// 2. setInterval运行机制
// setInterval的运行机制是，将指定的代码移出本次执行，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout指定的代码，必须等到本次执行的所有代码都执行完，才会执行。

// 每一轮Event Loop时，都会将“任务队列”中需要执行的任务，一次执行完。setTimeout和setInterval都是把任务添加到“任务队列”的尾部。因此，它们实际上要等到当前脚本的所有同步任务执行完，然后再等到本次Event Loop的“任务队列”的所有任务执行完，才会开始执行。由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，setTimeout和setInterval指定的任务，一定会按照预定时间执行。

//setTimeout模拟setInterval   亲试：管用
var i = 1;
var timer = setTimeout(function () {
	alert(i++);
	timer = setTimeout(arguments.callee, 2000);
}, 2000);

////原生js实现jquery函数animate()动画效果
function animate(obj, json, interval, sp, fn) {
	clearInterval(obj.timer);
	//var k = 0;
	//var j = 0;
	function getStyle(obj, arr) {
		if (obj.currentStyle) {
			return obj.currentStyle[arr];    //针对ie
		} else {
			return document.defaultView.getComputedStyle(obj, null)[arr];
		}
	}
	obj.timer = setInterval(function () {
		//j ++;
		var flag = true;
		for (var arr in json) {
			var icur = 0;
			//k++;
			if (arr == "opacity") {
				icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
			} else {
				icur = parseInt(getStyle(obj, arr));
			}
			var speed = (json[arr] - icur) * sp;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (icur != json[arr]) {
				flag = false;
			}
			if (arr == "opacity") {
				obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
				obj.style.opacity = (icur + speed) / 100;
			} else {
				obj.style[arr] = icur + speed + "px";
			}

		}

		if (flag) {
			clearInterval(obj.timer);
			if (fn) {
				fn();
			}
		}
	}, interval);
}


//删除数组指定的某个元素

Array.prototype.remove = function (val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};