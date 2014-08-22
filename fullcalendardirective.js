angular.module('app.directives').directive('fullcalendar', 
  function($compile,$modal,ngDialog) {
    return {
      restrict: 'E',
       scope: {
        directData: '=',
        saveData: '&'
       },
      templateUrl: 'template/calendar.html',
      link: function(scope, elem, attrs, ngModel) {
       
       //var clone_eventobj=angular.copy(scope.directData);
       var eventobj= scope.directData;
       var colourofcat=[];
       var runnumber = 1;
       var currentID= 'cID'+runnumber;
       var catposition=[];

       for(var i=0;i<eventobj.length;i++){

        $('#chkbox').append('<input class="chkbxclass" id="chkbx'+i+'" name="'+i+'" type="checkbox"  checked >'+eventobj[i][0].category+'</input>');
         colourofcat.push({name:eventobj[i][0].category,color:eventobj[i][0].color});
         catposition.push({name:eventobj[i][0].category,index:i});
       }
       



        //   $compile($('.chkbxclass'))(scope);
     
           $('.chkbxclass').change(function(e) {
            //  console.log(e);
                if(e.target.checked){
                   $('#calendarui').fullCalendar( 'addEventSource', eventobj[e.target.name] );
                }else{
                   $('#calendarui').fullCalendar('removeEventSource',eventobj[e.target.name]);
                }
           });


        scope.savedataNew = function(){

          console.log(eventobj);

        }   


        scope.savedata = function(){

        var tempdata= $('#calendarui').fullCalendar('clientEvents');
        var datatosave=[];
        var start;
        var end;

        for(var i=0;i<tempdata.length;i++){

          start = tempdata[i].start.format();

          end   = tempdata[i].end.format();
          
          datatosave.push({
            id:  tempdata[i].id ,
            title: tempdata[i].title ,
            start: start ,
            end: end
          });

        }
        scope.saveData({data: datatosave});

        }

        scope.dropevent = function(e){
       //   console.log(e.end.format("dddd, MMMM Do YYYY, h:mm:ss a"));
          scope.updateData(e.id,e.start.format(),e.end.format());
        }


        scope.resizeevent = function(e){
         // console.log(e);
           scope.updateData(e.id,e.start.format(),e.end.format());
        }

        scope.updateData = function(id,start,end){

          for(var i=0;i<eventobj.length;i++){
              for(var j=0;j<eventobj[i].length;j++){
                  if(eventobj[i][j].id==id){
                    eventobj[i][j].start=start;
                    eventobj[i][j].end=end;
                  }
              }
          }

        }


var ModalCtrl = function ($scope,$modalInstance,start,end,colorofcat) {
  $scope.objform={};
  $scope.selectcat={};

    $scope.categort_list=colorofcat;

     $scope.ok = function(){
     // console.log(JSON.parse($scope.objform.selectcat).color);

      $modalInstance.close({
        id: currentID,
        name: $scope.objform.objname,
        cat: JSON.parse($scope.objform.selectcat).name,
        color: JSON.parse($scope.objform.selectcat).color,
        status: 0
      });//return data

      runnumber++;
      currentID = 'cID'+runnumber;


      }

     $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
      }
      
    }
   
 
  scope.selectevent=function(start,end){

     var modalInstance = $modal.open({
          templateUrl: 'template/popupModal.html',
          controller: ModalCtrl,
          resolve: {
              start: function () {
                  return start;
              },
              end: function(){
                  return end;
              },
              colorofcat: function(){
                  return colourofcat;
              }
          }
      });

  modalInstance.result.then(function (data) {
//    console.log(catposition);
      var eventData;

      eventData = {
                        id:   data.id,
                        title: data.name,
                        start: start,
                        end: end,
                        category: data.cat,
                        color: data.color,
                        status: data.status

                  }

       for(var i=0;i<eventobj.length;i++){
        if(eventData.category==catposition[i].name){
            eventobj[catposition[i].index].push(eventData);
            //console.log(eventobj);
           $('#calendarui').fullCalendar( 'removeEventSource', eventobj[catposition[i].index] );  
          $('#calendarui').fullCalendar( 'addEventSource', eventobj[catposition[i].index] );
        }
      }            
      // $('#calendarui').fullCalendar( 'addEventSource', eventobj[e.target.name] );

        // $('#calendarui').fullCalendar('renderEvent', eventData, true); // stick? = true  
          $('#calendarui').fullCalendar('unselect');         
  });

  }//end selectevent


  scope.clickcalendar = function(e){
    console.log(e);
      // $(this).css('border-color', 'red');
  }



      $('#calendarui').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2014-06-12',
      selectable: true,
      selectHelper: true,
      select: scope.selectevent


     /* function(start, end) {

                    var title = prompt('Event Title:');
                    var eventData;
                    if (title) {
                      eventData = {
                        title: title,
                        start: start,
                        end: end
                      };
                      $('#calendarui').fullCalendar('renderEvent', eventData, true); // stick? = true
                    }
                    $('#calendarui').fullCalendar('unselect');
      }*/


      ,
      editable: true,
      eventSources: eventobj,
      eventDrop: scope.dropevent,
      eventResize: scope.resizeevent,
      eventClick: scope.clickcalendar
    });
  

  		}//end link
	};//end return
});