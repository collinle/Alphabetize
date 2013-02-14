
$(document).ready(function() {
   var key = createKey();
   var numSwaps;
   var remov;

   var newwords = encrypt(key);
   var score = checkSort(newwords);
   var newScore;
   var newKey;
   var flag = 0;

   $('body').on("click", '#begin', function() {
     $('tbody').append('<tr><td>' + key + '</td><td>' + score + '</td><td></td><td id="noborder"><button id="next">Next step</button</td></tr>');      
     $(this).hide();
     $('#explain').show();
   });

   $('body').on("click", '#next', function() {
     numSwaps = Math.max(8 - score/50, 1);
     flag = 0;
     remov = 0;
     var count = 0;
     while(flag == 0) {
	count++;
	if(count % 100 == 0) numSwaps--;
	if(count == 1000) {
	  if(confirm("The Computation is taking too long. Press OK to reload the page and try again with a new random key. Otherwise, press Cancel to try again")) {
	    document.location.reload(true);
	    break;
	  }
 	  else {
	    remov = 1;
	    break;
	  };
	};
        newKey = createNewKey(key, numSwaps);
	newwords = encrypt(newKey);
	newScore = checkSort(newwords);
	if(newScore > score) {
	  flag = 1;
	  $('tbody').append('<tr><td>' + newKey + '</td><td>' + newScore + '</td><td>' + numSwap(key.split(''), newKey.split('')) + '</td><td id="noborder"><button id="next">Next step</button</td></tr>'); 
	  score = newScore;
	  key = newKey;
	  window.scrollTo(0, document.body.scrollHeight);
	};
     };
     if(remov == 0)
       $(this).remove();
   });
});

var createKey = function() {

var abc = "abcdefghijklmnopqrstuvwxyz";
var shuffled = abc.split('').sort(function(){return 0.5-Math.random()}).join('');

return shuffled;
}

var createNewKey = function(key, num) {

for(var i=0;i<num;i++) {
  key = key.split('');
  var a = Math.floor(Math.random()*26);
  var b = Math.floor(Math.random()*26);  
  var temp = key[a];
  key[a] = key[b];
  key[b] = temp;
  key = key.join('');
};

return key;
}


var encrypt = function(key) {


var newwordlist = [];
var abc = "abcdefghijklmnopqrstuvwxyz".split('');

for(var i=0;i<wordlist.length;i++) {
  var newword = [];
  var word = wordlist[i].split('');
  for(var j=0; j<word.length; j++) {
    newword.push(key[abc.indexOf(word[j])]);
  }
  newwordlist.push(newword.join(''));
}

return newwordlist;
}



var checkSort = function(wordlist) {
var i = 0;
for(var j=0; j<wordlist.length;j++) {
  if(wordlist[j].split('').sort().join('') === wordlist[j]) {
    i++;
  }
}
return i;
}

var numSwap = function(list1, list2) {
var count = 0;
for(var i=0;i<list1.length;i++) {
  if(list1[i] != list2[i]) count++;
};

return count;
}

