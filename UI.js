function UIMultiBars(Count, ParentDiv, Colors)
{

  let ttt = document.getElementById("death").innerHTML;
  ttt.innerHTML += "<br><br><br><br>"
//alert("ttt" + " = " + window['ttt']);
  for(let i=0; i<Count-1; i++)
  {
    ttt.innerHTML+= '<div id="' + ParentDiv + i + '" class="w3-' + Colors[i] + '" style="float:left; width:0%">&nbsp</div>';
  }
ttt.innerHTML += "<br><br>";
}

function UI_TriTable(ParentDiv, names, values)
{

  values[0]='<svg width="50" height="50" data-jdenticon-value="'+ values[0] +'"></svg><br>'+ values[0];
  document.getElementById(ParentDiv).innerHTML=
  '<table class="w3-table w3-border">' +
        '<tr class="w3-border HomesRow">' +
          '<td id="'+ names[0]+'" >'+values[0]+'</td>' +
          '<td id="'+ names[1]+'">'+values[1]+'</td>' +
          '<td id="'+ names[2]+'">'+values[2]+'</td>' +
      '  </tr>'
      '</table>';

}
