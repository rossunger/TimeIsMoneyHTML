/*
TO FIX
  Leave a job... apply for unemployment
  Buttons that dont work yet:
    Save
    Invest
*/

function StartTimers()
{
  InitialiseGame();
  //Hide the begin button and show everything else
  document.getElementById("MainDiv").style.display = "";
  document.getElementById("ButtonBegin").style.display = "none";
  //start that timer that estimates time left
  setTimeout(Timer, TimerInterval);
  TimerInterval=10;
}
function Timer()
{
  if (TimeLeft<1)
  {
    TimeLeft=0;
    document.getElementById("death").innerHTML="YOU ARE DEAD";
    return false;
  }
  setTimeout(Timer, TimerInterval);
  TimeLeft -= SpeedOfTime;
  bodyHealth-=0.03;

  heartHealth= Math.min(100, heartHealth - (Math.ceil(Math.random() * 2)*2-3)*0.1);
  headHealth= Math.min(100, headHealth - (Math.ceil(Math.random() * 2)*2-3)*0.1);

  Chores+=0.01;
  if (!isNaN(TimeLeft))
  {
    Age=71-Math.ceil(TimeLeft/60/60/24/365);
  //hunger, 100% every 8 hours ... seconds that passed/ seconds in an hour / 8 hours * 100%
    Hunger=(Last[0]-TimeLeft) / Hour / 0.08;
    if (Hunger>60)
    {
        document.getElementById("EatButton").classList.add("highlight");
    }
    if (Tired>60)
    {
        document.getElementById("SleepButton").classList.add("highlight");
    }
    if (Tired>=99)
    {
      document.getElementById("EatButton").disabled=true;
    }else {
      document.getElementById("EatButton").disabled=false;
    }
    if(Auto[0]){ if(Hunger>60)DoEat();}
    if(Auto[1]){ if(Tired>60)DoSleep();}
    if(Auto[2]){ if(bodyHealth<90)DoCheckHealth();}
    if(Auto[6]){ if(Last[6] - TimeLeft>Hour)DoWork();}
    //document.getElementById("EatButton").disabled=Math.floor(Hungry);//"true";
  //Sleep, 100% every 16 hours ... seconds that passed / seconds in an hour / 8 hours * 100%
    Tired=(Last[1]-TimeLeft) / Hour / 0.16;

  //cant ovserve until eating and sleeping is a habit
    if (Auto[0] && Auto[1])
    {
      document.getElementById("observeButton").disabled=false;
      document.getElementById("observeButton").title="Spend a day trying to make sense of this world";
    }
    if (Age==DiscoveryAge) DoDiscovery();

    if (Auto[3])
    {
      Masc*=GenderSpeed ;
      Fem*=GenderSpeed ;
      Enby*=GenderSpeed ;
      switch (Math.max(Fem,Masc,Enby)) {
        case Masc:
            Masc*=GenderBoost ;
          break;
        case Fem:
          Fem*=GenderBoost ;
          break;
        case Enby:
          Enby*=GenderBoost ;
          break;
      };
    }else {
      Masc*=0.999;
      Fem*=0.999;
      Enby*=0.999;
    }
    for (let i=0; i<Avails.length; i++)
    {
      Avails[i]+=AvailDirection[i]/100 * AvailDuration[i] * SpeedOfTime/30;
      if (Avails[i]>=1)AvailDirection[i]=-1;
      if (Avails[i]<=-1)AvailDirection[i]=1;
    }

    SpeedOfTime = Math.max(0, Math.min(100-Hunger, 100-Tired, 100));

    let max = Avails.reduce(function(a, b) {   return Math.max(a, b)});
    if (max>=AvailThreshold)
    {
      document.getElementById("SeekLoveButton").disabled=0;
      if (Auto[4]==1)DoSeekLove();
    }
    else {
      document.getElementById("SeekLoveButton").disabled=1;
    }


    if (Auto[5])
    {
      if(Last[5]-TimeLeft>=Hour * 16)  DoSchool();
    }
    NeedLove=(Last[4]-TimeLeft)/1000;
    if(NeedLove>100)Trust-=0.02+ NeedLove/10000
    if(NeedLove<50)Trust+=0.02;
    if (Savings>0)
    {
      DoCalculateSavings();
    }

    UpdateHTMLElements();
  }
  else {
    Age = "Timeless";
    UpdateHTMLElements();
  }
}
function BeHappy()
{
}

function DoStudy()
{
  Skills = Skills+1;
  TimeLeft -= 3600;
}
function DoCheckHealth()
{
  bodyHealth=Math.min(100, bodyHealth+5);
  TimeLeft-=TimeCost[2];
  Last[2]=TimeLeft;
  Counter[2]+=1;
  if (Counter[2]>3)
  {
      DoDisplayHabit("AutoHealthCheck");
  }
}

function DoEat()
{

  TimeLeft-=TimeCost[0]*Hunger/100;
  Hunger=0;
  Last[0]=TimeLeft;
  Counter[0]+=1;
  if (Counter[0]>3)
  {
      DoDisplayHabit("AutoEat");
  }
  document.getElementById("EatButton").classList.remove("highlight");
}
function DoSleep()
{
  Tired=Math.max(Tired-100, 0);
  TimeLeft-=TimeCost[1];
  Last[0]-=TimeCost[1]; ///sleep shouldn't affect hunger!
  Last[4]-=TimeCost[1]; ///sleep shouldn't affect needing love!
  Last[1]=TimeLeft;
  Counter[1]+=1;
  if(Counter[1]>3)
  {
      DoDisplayHabit("AutoSleep");
  }
  document.getElementById("SleepButton").classList.remove("highlight");
}

function DoMakeFriend(x)
{
  TimeLeft-=TimeCost[6];
  let nf=document.getElementById('NewFriend'+x);
  let a = nf.children[0].innerHTML;
  let b = nf.children[1].innerHTML;
  let c = nf.children[2].innerHTML;
  TimeCost[14]+=parseInt(b);
  FriendCount+=1;
  let n = ' <tr id="friend' + FriendCount + '" class="w3-border w3-hover-red CloseFriend" onclick="DoAbandonFriend('+FriendCount+');"> <td>' + a + '</td><td>'+ b +'</td><td>'+c+'</td></tr>';

  document.getElementById("CloseFriendsTable").innerHTML+=n;

  nf.parentNode.removeChild(nf);


  let zz = document.getElementById("AvailabilityDiv");
  zz.innerHTML+='<div class="" id="FriendAvail'+FriendCount+'" style="float:left;">&nbsp</div>'
  Avails[FriendCount-1]=1;
  AvailDuration[FriendCount-1]=0.8;
  AvailDirection[FriendCount-1]=1;
  for (let ii=0; ii<FriendCount; ii++)
  {
    zz.children[ii].style.width=100/FriendCount+"%";

    zz.children[ii].style.backgroundColor="hsl("+360/FriendCount*ii+", 100%, 50%)";
//    zz.children[ii].style.border="blue solid 1px";
  }




}
function DoMeetStranger()
{
  NewFriendCount+=1;
  TimeLeft-=TimeCost[7];
  let a=chance.first();
  let b=(Math.random()*3+1).toFixed(0);
  let c=(Math.random()*8).toFixed(0)+'/10';
  let av= 'http://avatars.dicebear.com/v1/'+'male'+'/'+a+'/100.png';
  let d='<tr id="NewFriend'+NewFriendCount+'" class="w3-border w3-hover-green NewFriend" onclick="DoMakeFriend('+NewFriendCount+')"><td class="NewFriend"><img src="' + av + '" style="width:100%"><span class="FriendName"> '+a+'</span></td><td class="NewFriend">'+b+' hr(s)</td><td class="NewFriend">'+ c +'</td></tr >';

  document.getElementById("NewFriendTable").innerHTML= d + document.getElementById("NewFriendTable").innerHTML;

  //if (NewFriendCount>5)

}
function DoExploreSexuality()
{
}
function DoObserve()
{
  TimeLeft-=Month * 6; //TimeCost[8];
}
function DoDisplayHabit(HabitName)
{
  switch (HabitName) {
    case "AutoSleep":
      if (Auto[1]==false) document.getElementById("autoSleep").style.display="inherit";
      document.getElementById("HabitsDiv").style.display="";

      break;
    case "AutoEat":
      if (Auto[0]==false) document.getElementById("autoEat").style.display="inherit";
      document.getElementById("HabitsDiv").style.display="";
      break;
    case "AutoHealthCheck":
      if (Auto[2]==false) document.getElementById("autoHealthCheck").style.display="inherit";
      break;
    case "AutoGender":
      if (Auto[3]==false) document.getElementById("autoGender").style.display="inherit";
      break;
    case "AutoSeekLove":
      if (Auto[4]==false) document.getElementById("autoSeekLove").style.display="inherit";
      break;
    case "AutoSchool":
      if (Auto[5]==false) document.getElementById("autoSchool").style.display="inherit";
      break;
    case "AutoWork":
        if (Auto[6]==false) document.getElementById("autoWork").style.display="inherit";
        break;
    case "AutoChores":
        if (Auto[16]==false) document.getElementById("autoChores").style.display="inherit";
        break;
    default: alert(HabitName + " does not exist!")

  }

}
function DoAuto(x)
{
  Auto[x]=true;
  document.getElementById("auto"+Habit[x]).style.display="none";
  if (x==3)
  {
    TimeCost[3]*=0.1;
    //TimeLeft=Year*69.5;
  }
/*  if (x==5)
  {
    document.getElementById("UniDiv").style.display="inherit";
  }
*/
}
function DoExploreHeritage()
{

}

function DoDiscovery()
{
  switch (DiscoveryAge) {
    case 1:
      DiscoveryAge=2;
      document.getElementById("SocialDiv").style.display="inherit";
      Last[4]=TimeLeft;
      Trust=0;
      break;
    case 2:
      DiscoveryAge=3;
      document.getElementById("IdentityDiv").style.display="inherit";
      Gender=chance.gender();

      document.getElementById("myName").value = chance.name({ gender: Gender})
      break;
    case 3:
        DiscoveryAge=4;
        document.getElementById("HealthDiv").style.display="inherit";
        break;
    case 4:
        DiscoveryAge=5;
        document.getElementById("FriendsDiv").style.display="inherit";
        break;
    case 5:
        DiscoveryAge=6;
        document.getElementById("SchoolDiv").style.display="inherit";
        break;
    case 6:
      document.getElementById("CulturalBackgroundDiv").style.display="inherit";
      DiscoveryAge=7;
      break;
    case 7:
        document.getElementById("SpiritDiv").style.display="inherit";
        DiscoveryAge=8;
        break;
    case 8:
        document.getElementById("FinanceDiv").style.display="inherit";
        DiscoveryAge=9;
        break;
    case 9:
        document.getElementById("ChoresDiv").style.display="inherit";
        DiscoveryAge=10;
        break;

    case 10:
        document.getElementById("HappyDiv").style.display="inherit";
        DiscoveryAge=11;
        break;
    case 11:
        document.getElementById("SexualityDiv").style.display="inherit";
        //document.getElementById("ExploreSexuality").disabled="false";
        DiscoveryAge=12;
        break;
    case 12:
      DiscoveryAge=13;
      document.getElementById("VolunteerDiv").style.display="inherit";
      break;
    case 13:
      DiscoveryAge=14;
      document.getElementById("WorkOutDiv").style.display="inherit";
      break;
    case 14:
      DiscoveryAge=15;
      document.getElementById("WorkDiv").style.display="inherit";
      break;
    case 15:
      DiscoveryAge=16;
      document.getElementById("DatingDiv").style.display="inherit";
      break;
    case 16:
        DiscoveryAge=17;
        document.getElementById("SexDiv").style.display="inherit";
        break;
    case 17:
        DiscoveryAge=18;
        document.getElementById("CareerDiv").style.display="inherit";
        break;

    case 18:
        DiscoveryAge=19;
        document.getElementById("UniDiv").style.display="inherit";
        break;

    case 19:
        DiscoveryAge=20;
        document.getElementById("UnlearnGender").style.display="inherit";
        break;

    case 20:
            DiscoveryAge=21;
            document.getElementById("HomeDiv").style.display="inherit";
            break;
  }

}
function DoWorkOut()
{
    bodyHealth=Math.min(100, bodyHealth+5);
}
function DoGender(x)
{
  TimeLeft-=TimeCost[3]
  if (x=="masc")
  {
    if (Masc+Fem+Enby<100)Masc+=2; else Masc*=1.01;
  }
  if (x=="fem")
  {
    if (Masc+Fem+Enby<100)Fem+=2; else Fem*=1.01;
  }
  if (x=="unlearn")
  {
    //Masc/=1.1;
    //Fem/=1.1;
    if (Masc+Fem+Enby<100)Enby+=1; else Enby*=1.01;
    if (Enby<10)Enby+=1;
    document.getElementById("GenderNone").style.display="inherit";
  }
  if(Masc+Fem+Enby>=100)DoDisplayHabit("AutoGender")
}
function DoSeekLove()
{
  //let sum = Avails.reduce(function(a, b) {   return a+b)});
  //Trust+=(0.5 +sum)/Avails.length * SpeedOfTime/100;
  if (!Auto[4])Last[4]-=SpeedOfTime*TimeCost[4]*10;
  TimeLeft-=SpeedOfTime*TimeCost[4]/100;
  Last[4]-=SpeedOfTime*TimeCost[4];
  Last[4]=Math.max(Last[4],TimeLeft);
  Counter[4]+=1;
  if (Counter[4]>3) DoDisplayHabit("AutoSeekLove");
}

function DoSchool()
{
  Education[0]+=8;
  Last[5]=TimeLeft;
  TimeLeft-=TimeCost[5]
  Counter[5]+=1;
  if (Counter[5]>3) DoDisplayHabit("AutoSchool");

}
function ToggleDiv(x)
{

    if (document.getElementById(x).style.display=="none")
    {
      document.getElementById(x).style.display="inherit"
    } else {
    document.getElementById(x).style.display="none";
    }
}
function DoAreaOfInterest(x)
{
  Education[x]+=1;
}
function DoAbandonFriend(id)
{
  if (confirm("Are you sure you don't want to be friends anymore?"))
  {
    let t =document.getElementById('friend'+id);
    FriendCount-=1;
    t.parentNode.removeChild(t);
  }
}
function FindNewHome()
{
  let n = document.getElementById('NewHome1');
  n.style.display="inherit";
  let a = chance.address();//{short_suffix: true});
  let b = 300+ ((Math.random()*4).toFixed(0) * 50);
  let c = ((Math.random()*8+2).toFixed(0));
  n.children[0].innerHTML='<svg width="50" height="50" data-jdenticon-value="'+a+'"></svg><br>'+a;
  n.children[1].innerHTML='$'+b;
  n.children[2].innerHTML=c+'/10';
  //alert(n.children[0].parentNode.parentNode.innerHTML);
  jdenticon();
  n.onclick= function()
  {
    if(DoMoveHouse(a, b,c)) n.style.display="none";
  }

}
function DoMoveHouse(a,c,d)
{
  if(confirm('Are you sure you want to move here?'))
  {
    document.getElementById('currentHomeName').innerHTML= '<svg width="50" height="50" data-jdenticon-value="'+a+'"></svg><br>'+a;
    document.getElementById('currentHomeRent').innerHTML='$'+c;
    document.getElementById('currentHomeScore').innerHTML=d+'/10';
    CostRent=c;
    Expenses="???";
    jdenticon();
    return true;
  }
}
function FindNewJob()
{
  let n = document.getElementById('NewJob1');
  n.style.display="inherit";
  let a = chance.profession();
  let b = (CurrentBaseWage+(Math.random()*CurrentBaseWage*0.2)).toFixed(0);
  //let c = ((Math.random()*8+2).toFixed(0));
  n.children[0].innerHTML='<svg width="50" height="50" data-jdenticon-value="'+a+'"></svg><br>'+a;
  n.children[1].innerHTML='$'+b+"/hr";
  //n.children[2].innerHTML=c+'/10';
  //alert(n.children[0].parentNode.parentNode.innerHTML);
  jdenticon();
  n.onclick= function()
  {
    if(DoNewJob(a, b)) n.style.display="none";
  }

}
function DoNewJob(a, b)
{
  if(confirm('Are you sure you want to take this job?'))
  {
    document.getElementById('CurrentJobTable').innerHTML+='<tr id="Job'+JobCount+'" class="w3-hover-red" onclick="DoQuitJob('+JobCount +')"><td><svg width="50" height="50" data-jdenticon-value="'+a+'"></svg><br>'+a+'</td><td>$'+ b + '/hr';
    Wage=b;
    JobCount+=1;
    jdenticon();
    return true;
  }
}
function DoWork()
{
  TimeLeft-=TimeCost[9]
  Last[6]=TimeLeft;
  Counter[6]+=1;
  if (Counter[6]>3)
  {
      DoDisplayHabit("AutoWork");
  }

  Cash=parseInt(Cash)+parseInt(Wage);
}
function DoMakeBudget()
{
  TimeLeft-=TimeCost[10]
  Expenses=CostRent;
}
function DoEatOut()
{
  DoEat();
  Cash-=CostEatOut;
  Time-=TimeCost[11];
}
function DoBuyGroceries()
{
  Groceries+=21;
  document.getElementById('AvailableGroceries').innerHTML = Groceries;
  Cash-=CostGroceries;
  TimeLeft-=TimeCost[13];
}
function DoCook()
{
  Groceries-=1;
  document.getElementById('AvailableGroceries').innerHTML = Groceries;
  TimeLeft-=TimeCost[12]
  DoEat();
}
function DoAskParentsForMoney()
{
    Cash+=1;
    TimeLeft-=Minute*5;
}
function DoChores()
{
  Chores=Math.max(0, Chores-50);
  TimeLeft-=TimeCost[16]
  Last[16]=TimeLeft;
  Counter[16]+=1;
  if (Counter[16]>3)
  {
      DoDisplayHabit("AutoChores");
  }
}
function DoQuitJob(x)
{
  if (confirm("Are you sure you want to quit this job?"))
  {
    let t = document.getElementById('CurrentJobTable');
    let v= document.getElementById('Job'+x)
    v.parentNode.removeChild(v);
  }
}
function DoSavings()
{
  let t=1;
  let m=document.getElementById('SelectSavings');
  t=0.01* parseInt(m.options.item(m.selectedIndex).text);

  Savings+=Cash*t
  Cash-=Cash*t;
  TimeLeft-=TimeCost[15];
}
function DoCalculateSavings()
{
  Savings*=1+((LastSavings-TimeLeft)*(0.02/ Year));
  LastSavings=TimeLeft;
}
function DoApplyForCredit()
{

  document.getElementById("IncreaseCreditLimit").style.opacity="1";
  document.getElementById("IncreaseCreditLimit").style.transition="width 1s linear, opacity 0s";
  document.getElementById("IncreaseCreditLimit").addEventListener("transitionend", DoGotCredit);
  document.getElementById("IncreaseCreditLimit").style.width="100%";


}
function DoGotCredit()
{

  document.getElementById("IncreaseCreditLimit").style.transition="opacity 1s, width 0.1s linear 1s";
  //document.getElementById("IncreaseCreditLimit").removeEventListener("transitionend", DoGotCredit);
  CreditLimit+=500;
  document.getElementById("IncreaseCreditLimit").style.opacity="0";
  document.getElementById("IncreaseCreditLimit").style.width="0";
}



//Debug
function logAllButtons()
{
  let k=document.getElementsByTagName('button');
  let m='';
  for(let i=0; i<k.length; i++)
  {
      m+= k[i].innerHTML +', ';//.slice(0, (k[i].innerHTML.indexOf('<')+1)) + ', ';

  }
  console.log(m);
}
