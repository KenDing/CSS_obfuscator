/**
 * Модуль минифицирует и обфусцирует CSS классы.
 * @param {Array} data – массив CSS классов.
 * @return {Object} obj - объект с ключами в виде старых.
 * CSS классов и значениями в виде новых.
 */
module.exports = function(data){
	/**
	 * Вспомогательный метод для работы со строками.
	 * @method replaceAt
	 * @param {number} index
	 * @param {String} character
	 * @return {String}
	 */
	String.prototype.replaceAt=function(index, character) {
	    return this.substr(0, index) + character + this.substr(index+character.length);
	}
	/**
	 * Массив, хранящий допустимые символы
	 * для генерации новых имен классов.
	 * @type {Array}
	 */
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
	 * Возвращает следующее имя класса.
	 * Принцип действия наподобие инкрементирования
	 * в позиционной системе счисления.
	 * @function nextName
	 * @param {String} name - предыдшествующее сгенерированное
	 * имя класса.
	 * @return {String} - следующее имя.
	 */
	function nextName(name){
		for(var i=name.length-1;i>0;i--){
			// начиная с последней буквы имени
			var num = alphaNum.indexOf(name[i]);
			// получить номер в алфавите
			if(num < l2){
				// если возможно заменить символ на следующий
				name = name.replaceAt(i, alphaNum[num+1]);
				return name;
			}
			else{
				// иначе на первый символ
				name = name.replaceAt(i, 'a');
			}
		}
		var num = alphaNum.indexOf(name[0]);
		// первая буква
		if(num < l1){
			// если возможно заменить символ на следующий
			name = name.replaceAt(0, alphaNum[num+1]);
			return name;
		}
		else{
			// иначе на первый символ
			// и добавать еще один разряд
			name = name.replaceAt(0, 'a');
			return 'a' + name;
		}
			
	};
	/**
	 * Инициализируем объект.
	 * ключи - старые имена классов.
	 * значения - количество совпадений.
	 * @type {Object}
	 */
	var obj = {};
	for(i of data){
		if(!obj[i])obj[i] = 1;
		else obj[i]++;
	}
	/**
	 * Массив для сортировки по частоте
	 * и генерации новых имен.
	 * @type {Array}
	 */
	var sortable = [];
	for (i in obj)
		sortable.push([i, obj[i]]);
	sortable.sort(function(a,b){
		return b[1]-a[1];
	});
	// генерируем имена начиная с самого часто
	// встречающегося имени класса
	var prev = sortable[0][1] = 'a';
	for(i=1;i<sortable.length;i++)
		prev = sortable[i][1] = nextName(prev);

	// возращаем значения в объект
	obj = {};
	for(i of sortable)
		obj[i[0]] = i[1];

	return obj;
};