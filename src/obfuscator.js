/**
 * Модуль минифицирует и обфусцирует CSS классы
 * @param {Array} data – массив CSS классов
 * @return {Object} obj
 */
module.exports = function(data){
	/**
	 * Description
	 * @method replaceAt
	 * @param {} index
	 * @param {} character
	 * @return BinaryExpression
	 */
	String.prototype.replaceAt=function(index, character) {
	    return this.substr(0, index) + character + this.substr(index+character.length);
	}
	var alphaNum = [];
	var i = 'a'.charCodeAt(0), z = 'z'.charCodeAt(0);
	for(;i <= z; i++)
		alphaNum.push(String.fromCharCode(i));
	var l1 = alphaNum.length-1;
	for(i=0;i<10;i++)
		alphaNum.push(i+'');
	alphaNum.push('_'); alphaNum.push('-');
	var l2 = alphaNum.length-1;

	/**
	 * Description
	 * @method nextName
	 * @param {} name
	 * @return 
	 */
	function nextName(name){
		for(var i=name.length-1;i>0;i--){
			var num = alphaNum.indexOf(name[i]);
			if(num < l2){
				name = name.replaceAt(i, alphaNum[num+1]);
				return name;
			}
			else{
				name = name.replaceAt(i, 'a');
			}
		}
		var num = alphaNum.indexOf(name[0]);
		if(num < l1){
			name = name.replaceAt(0, alphaNum[num+1]);
			return name;
		}
		else{
			name = name.replaceAt(0, 'a');
			return 'a' + name;
		}
			
	};
	var obj = {};
	for(i of data){
		if(!obj[i])obj[i] = 1;
		else obj[i]++;
	}

	var sortable = [];
	for (i in obj)
		sortable.push([i, obj[i]]);
	sortable.sort(function(a,b){
		return b[1]-a[1];
	});

	var prev = sortable[0][1] = 'a';
	for(i=1;i<sortable.length;i++)
		prev = sortable[i][1] = nextName(prev);

	obj = {};
	for(i of sortable)
		obj[i[0]] = i[1];

	return obj;
};