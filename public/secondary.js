function prettyRaCo()
        {
            var colorWheel =  Math.floor(Math.random()*6);

            var color = "rgb(";
            var randomNumber =  Math.floor(Math.random()*256);
            if(colorWheel ==0)
            color= color+ "0,255,"+randomNumber+")";
             if(colorWheel ==1)
            color= color+ "0,"+randomNumber+",255)";
             if(colorWheel ==2)
            color= color+ "255, 0,"+randomNumber+")";
             if(colorWheel ==3)
            color= color+ "255,"+randomNumber+",0)";
             if(colorWheel ==4)
            color= color+ randomNumber+",255,0)";
             if(colorWheel ==5)
            color= color+ randomNumber+",0,255)";
            return color;
        }
function combine(obj1,obj2){
  console.dir([obj1,obj2])
    return [obj1.x-obj2.x,obj1.y-obj2.y]
}

function addup(obj1,obj2){
    return [obj1.x+obj2.x,obj1.y+obj2.y]

}

 function prettyRaCo2(whiteness)
        {
            var key =  Math.floor(Math.random()*6);
            var text = "rgb(";
            var num =  Math.floor(Math.random()*256);
            whiteness = whiteness%255;
            if(key ==0)
            text= text+ "0,255,"+whiteness+")";
             if(key ==1)
            text= text+ "0,"+whiteness+",255)";
             if(key ==2)
            text= text+ "255, 0,"+whiteness+")";
             if(key ==3)
            text= text+ "255,"+whiteness+",0)";
             if(key ==4)
            text= text+ whiteness+",255,0)";
             if(key ==5)
            text= text+ whiteness+",0,255)";
            return text;
        }


function num(range){
  return Math.floor(Math.random()*range);
}
function numH(){
  return Math.floor(Math.random()*view.size.height);
}
function numW(){
  return Math.floor(Math.random()*view.size.width);
}
