var varNames=["Name", "Year", "Month", "TimeLeft"];

var ggg=0;
var debug=0;
//Time
var Year = 31104000;
var Month = 2592000;
var Week = 604800;
var Day = 86400;
var Hour = 3600;
var Minute = 60;
var FirstOfTheMonth = TimeLeft  - Month;
var TimerInterval = 300; //0.3 seconds per game second
var TimeLeft = 2209032000;
var Age = 0;
var SpeedOfTime=100;
//0 Eat , 1 Sleep, 2 Health, 3 Gender, 4 SeekLove, 5 School, 6 Make Friend, 7 meet stranger, 8 observe world, 9 work, 10 make budget, 11 Eat Out, 12 cook, 13 get groceries, 14 Friends, 15 Savings, 16 chores,
var TimeCost= [Minute*20, Hour*8, Hour*4, Hour, 5,Hour*8, Hour*6, Hour *4, Day, Hour*8, Minute*20, Minute*30, Hour, Hour, 0, Minute*30, Hour, Minute*10, Hour];
var DecoloniseTime=0;
var HabitTotalTime =0;

//Personal Growth
var Skills=0;
var Knowledge=0;
var Reputation=0;
var Productivity=0;
var Happiness=50;
var MentalHealth=0;
var Inspiration=0;

//Career
var CurrentBaseWage = 15;
var Wage=0;
var Dollars=0;
var CreditLimit = 0;
var JobCount = 0;

//Finances
var DailyInterest = 0.00547570157;
var Savings=0;
var LastSavings=TimeLeft;
var Investments=0;
var Expenses=0;
var Cash=0;
//The cost of things. 1 groceries, 2 rent, 3 healthcare, 4 social
var CostGroceries=50;
var CostRent=0;
var CostEatOut=25;
var CreditLimit=0;
var CreditRating=0;
var CreditDebt=0;


//Basic NEEDS
var Hunger=0;
var EatingTime=1200; //20 minutes to eat
var LastEat=TimeLeft;
var Tired=0;
var SleepTime=36000;
var LastSleep=TimeLeft;
var EatCounter=0;
var SleepCounter=0;
var AutoEat = false;
var AutoSleep = false;
var DiscoveryAge=1;
var Groceries = 0;
var Chores = 0;

//Identity
var Gender="";
var Masc=1;
var Fem=1
var Enby=0;
var Sexuality="";
var Name = "";
var GenderSpeed =1.0001;
var GenderBoost = 1.00001;

//Health
var LastHealthCheck=TimeLeft;
var HealthCheckCounter=0;
var AutoHealthCheck=0;
var Trauma=0;
var headHealth=100;
var heartHealth=100;
var bodyHealth=100;
var BodyCareTime=600;

//Habits - eat, sleep, health check,       read, watch TV?
var Habit=["Eat", "Sleep", "HealthCheck", "Gender", "SeekLove", "School", "Work", "BuyGroceries", "Cook", "Budget", "Invest", "Save", "MaintainFriendships", "","","", "Chores"];
var Auto=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var Counter=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var Last=[TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft,TimeLeft];

//Social
var Avails = [0,0]
var AvailDirection = [];
var AvailDuration = [];
var Trust=0;
var NeedLove=0;
var FriendCount=0;
var NewFriendCount=0;
var AvailThreshold=0.5;

//SCHOOL  basic, arts, science, it, leadership
var Education=[0,0,0,0,0,0,0];

//CULTURES: Euro, Afro, Asio, Americano
var Cultures=[0,0,0,0];


function CleanTime(i)
{
  let x="";
  if (i/Minute > 1)x= "Minute";
  if (i/Hour > 1)x= "Hour";
  if (i/Day > 1)x= "Day";
  if (i/Week> 1)x= "Week";
  if (i/Month > 1)x= "Month";
  if (i/Year > 1)x= "Year";

  return Math.round(i/window[x]) + " "+ x+"(s)";
}

function UpdateHTMLElements()
{
  document.getElementById("SpeedOfTime").value = SpeedOfTime;
  document.getElementById("EatButton").title = CleanTime(EatingTime) + " per meal";
  document.getElementById("SleepButton").title = CleanTime(SleepTime) + " per night";
  document.getElementById("time").innerHTML = TimeLeft.toFixed(0);
  document.getElementById("age").innerHTML = Age;
  document.getElementById("hungry").innerHTML = Hunger.toFixed(0);
  //document.getElementById("dollars").innerHTML = Dollars;
  document.getElementById("Happiness").innerHTML = Happiness;
  //document.getElementById("skills").innerHTML = Skills;
  document.getElementById("tired").innerHTML = Tired.toFixed(0);
  document.getElementById("discoveryAge").innerHTML = DiscoveryAge;

//HEALTH
  document.getElementById("LastHealthCheck").innerHTML =CleanTime(Last[2]-TimeLeft);
  document.getElementById("headHealth").innerHTML = headHealth.toFixed(0);
  document.getElementById("heartHealth").innerHTML = heartHealth.toFixed(0);
  document.getElementById("bodyHealth").innerHTML = bodyHealth.toFixed(0);
  document.getElementById("Chores").innerHTML = Chores.toFixed(0);


  let ratio =1;
  if (Masc+Fem+Enby>99) ratio=(Masc + Fem + Enby) / 100;
  document.getElementById("GenderMasc").style.width = Masc/ratio+"%";
  document.getElementById("GenderFem").style.width = Fem/ratio+"%";
  document.getElementById("GenderNone").style.width = Enby/ratio+"%";
document.getElementById("GenderNone").innerHTML=Math.round(Enby/ratio)+"%";
document.getElementById("GenderMasc").innerHTML=Math.round(Masc/ratio)+"%";
  document.getElementById("GenderFem").innerHTML=Math.round(Fem/ratio)+"%";

  switch (Math.max(Masc,Fem,Enby)) {
    case Masc:
        document.getElementById("PerceivedGender").innerHTML= "Male";
      break;
    case Fem:
        document.getElementById("PerceivedGender").innerHTML= "Female";
      break;
    case Enby:
        document.getElementById("PerceivedGender").innerHTML= "Non-binary";
      break;
  }
  let k=Math.max(Masc,Fem,Enby);

  if (k/ratio<70) document.getElementById("PerceivedGender").innerHTML+= "?";


  let t="Current Habits: <br>";
  for(let j=0; j<Habit.length; j++)
  {
    if (Auto[j]) t+=Habit[j]+ ", "
  }
  document.getElementById("HabitList").innerHTML =t;

  //Social
  for (let i=1; i<Avails.length+1; i++)
  {
    document.getElementById("FriendAvail"+i).style.opacity=Avails[i-1];
    ///ggg=[i-1];

  }
  document.getElementById("NeedLove").innerHTML=NeedLove.toFixed(0);
  document.getElementById("Trust").innerHTML=Trust.toFixed(0);
  let e=Education.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
  document.getElementById("Education").innerHTML = e;

  e+=100 - Education[0];
  for(let i=1; i<Education.length; i++)
  {
    let t = document.getElementById("AOI"+i);
    t.style.width= Education[i]/e*100 + "%";
    t.title=Education[i];
  }

  document.getElementById("Wealth").innerHTML = (Cash + Savings + Investments-CreditDebt).toFixed(2);
  document.getElementById("Cash").innerHTML = Cash.toFixed(2);
  document.getElementById("Savings").innerHTML = Savings.toFixed(2);
  document.getElementById("Expenses").innerHTML = Expenses.toFixed(2);
  document.getElementById("Investments").innerHTML = Investments.toFixed(2);
  document.getElementById("CreditCardDebt").innerHTML = CreditDebt.toFixed(2);
  document.getElementById("CreditCardLimit").innerHTML = CreditLimit.toFixed(2);

  calculateHabitTotalTime();
  document.getElementById("HabitTotalTime").innerHTML = HabitTotalTime;
}
UpdateHTMLElements();
function debugVariables()
{
    let s=document.getElementById("debugVar").value;
    alert(s + " = " + window[s]);
}
function SaveCookie()
{
  var cookie="";
  for(i = 0; i < varNames.length; i++)
  {
      cookie = varNames[i] + "=" + window[varNames[i]];
      document.cookie=cookie;
  }
}
function LoadCookie()
{
  var decodedCookie= "";//  document.cookie;//decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  // /ret= ca[0];
  for(let i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      for(let j = 0; j < varNames.length; j++)
      {
        var name = varNames[j] + "=";
        if (c.indexOf(name) == 0) {
            window[varNames[j]]=c.substring(name.length, c.length);

          }

        }
    }
}

function InitialiseGame()
{
    //Set hidden
    document.getElementById("IdentityDiv").style.display="none";
    document.getElementById("WorkDiv").style.display="none";
    document.getElementById("CareerDiv").style.display="none";
    document.getElementById("SocialDiv").style.display="none";
    document.getElementById("SchoolDiv").style.display="none";
    document.getElementById("HabitsDiv").style.display="none";
    document.getElementById("FinanceDiv").style.display="none";
    document.getElementById("HealthDiv").style.display="none";
    document.getElementById("HomeDiv").style.display="none";
    document.getElementById("GroceryDiv").style.display="none";
    document.getElementById("SpiritDiv").style.display="none";
    document.getElementById("AdvancedHabitsDiv").style.display="none";
    document.getElementById("FriendsDiv").style.display="none";
    document.getElementById("SexDiv").style.display="none";
    document.getElementById("SexualityDiv").style.display="none";
    document.getElementById("CulturalBackgroundDiv").style.display="none";
    document.getElementById("HappyDiv").style.display="none";
    document.getElementById("DatingDiv").style.display="none";
    document.getElementById("ChoresDiv").style.display="none";
    document.getElementById("WorkOutDiv").style.display="none";
    document.getElementById("VolunteerDiv").style.display="none";
    document.getElementById("SavingsDiv").style.display="none";

    document.getElementById("ManageTimeDiv").style.display="none";
    document.getElementById("TimeSpentOnHabitsDiv").style.display="none";


    document.getElementById("PerceivedGender").innerHTML= "Male?";

    document.getElementById("Birth").style.display="none";

    document.getElementById("SexualitySelector").disabled=1;
    let t = document.getElementById("AreasOfInterest");
    let c = ["", "blue","red","purple", "green", "brown","orange"]
    for(let i=0; i<Education.length; i++)
    {
      t.innerHTML +=      '<div id="AOI' + i + '" class="w3-' + c[i] + '" style="float:left; width:0%">&nbsp</div>';
    }
    t.innerHTML+='<br><br>'

    document.getElementById('currentHomeName').innerHTML= '<svg width="50" height="50" data-jdenticon-value="Parents House"></svg><br>Parents House';
    document.getElementById('currentHomeRent').innerHTML='free';
    document.getElementById('currentHomeScore').innerHTML='4/10';
    jdenticon();

    let ci=document.getElementsByClassName("ChangeIdentity");
    for (let j=0; j<ci.length; j++)
    {

      ci[j].style.display="none";
    }

    //Initialise Parents
    let av= 'http://avatars.dicebear.com/v1/'+'female'+'/'+"Mom"+'/100.png';
    let av2= 'http://avatars.dicebear.com/v1/'+'male'+'/'+"Dad"+'/100.png';
    let n = ' <tr id="friend1" class="w3-border w3-hover-red CloseFriend" onclick="DoAbandonFriend(1);"> <td><img src="' + av + '" style="width:100%"> Mom</td><td>1 hr(s)</td><td>5/10</td></tr><tr id="friend2" class="w3-border w3-hover-red CloseFriend" onclick="DoAbandonFriend(2);"> <td><img src="' + av2 + '" style="width:100%"> Dad</td><td>1 hr(s)</td><td>4/10</td></tr>';
    FriendCount+=2;
    TimeCost[14]+=2;
    Avails[0]=1;
    Avails[1]=1;
    AvailDirection[0]=1;
    AvailDirection[1]=1;
    AvailDuration[0]=0.3;
    AvailDuration[1]=0.5;
    let zz = document.getElementById("AvailabilityDiv");
    zz.innerHTML+='<div class="" id="FriendAvail1" style="float:left; width:50%; background-Color: hsl(0, 100%, 50%)">&nbsp</div><div class="" id="FriendAvail2" style="float:left; width:50%; background-Color: hsl(180, 100%, 50%)">&nbsp</div>'




    document.getElementById("CloseFriendsTable").innerHTML+=n;


    if (debug==true)
    {
      document.getElementById("FinanceDiv").style.display="inherit";
      document.getElementById("SavingsDiv").style.display="inherit";
      document.getElementById("WorkDiv").style.display="inherit";

      document.getElementById("IdentityDiv").style.display="inherit";
//      document.getElementById("CareerDiv").style.display="inherit";
      document.getElementById("SocialDiv").style.display="inherit";
//      document.getElementById("SchoolDiv").style.display="inherit";
      document.getElementById("HabitsDiv").style.display="inherit";
//      document.getElementById("FinanceDiv").style.display="inherit";
      document.getElementById("HealthDiv").style.display="inherit";
//      document.getElementById("HomeDiv").style.display="inherit";
  DiscoveryAge=4;
      document.getElementById("debug").style.display="inherit";
      TimeLeft=Year*68.95;
      Last[4]=TimeLeft;
      for (let i=0; i<5; i++) Auto[i]=1;
        //Auto[3]=0;
        //DoDiscovery()
    }

}
function calculateHabitTotalTime()
{
let j=0;

if (Auto[0]) j+=TimeCost[0]*3*7;
if (Auto[1]) j+=TimeCost[1]*7;
if (Auto[2]) j+=TimeCost[2]/4;
if (Auto[3]) j+=TimeCost[3];
if (Auto[4]) j+=TimeCost[4]*2;

HabitTotalTime=(100/Week*j).toFixed(2);
}
function DoDecoloniseTime()
{
  if (DecoloniseTime>=100)
  {
    TimeLeft= "?????????????????";
  }
  else {
    DecoloniseTime+=20;
    document.getElementById("DecoloniseTime").style.width=DecoloniseTime+'%';
  }
}
