AngularJS-Calendar
==================

Calendar Component

indclude 
<script src="lib/moment.min.js"></script>
<script src="lib/fullcalendar.js"></script>


ใน fullcalendar.js แก้บรรทัดที่1543 function removeEventSource, isSourcesEqual ,getSourcePrimitive เป็น

function removeEventSource(sourceInput) {
		var source = buildEventSource(sourceInput);
		sources = $.grep(sources, function(src) {
			//console.log(src);
			return !isSourcesEqual(src, source);
		});
		// remove all client events from that source
		cache = $.grep(cache, function(e) {
			return !isSourcesEqual(e.source, source);
		});
		reportEvents(cache);
	}


	function isSourcesEqual(source1, source2) {
		return source1 && source2 && getSourcePrimitive(source1.events) == getSourcePrimitive(source2.events);
	}


	/*function getSourcePrimitive(source) {
		return ((typeof source == 'object') ? (source.events || source.url) : '') || source;
	}
	*/
	function getSourcePrimitive(source) {
   	for (var key in source) {
      return ((typeof source == 'object') ? (source[key].id || source[key].url) : '') || source;
   		}
		}
		
		

<fullcalendar direct-data="eventobj" save-data="savedata(data)"></fullcalendar>

-direct-data = objที่ส่งไปgen
  -รูปแบบ  $scope.eventobj = [$scope.cat1,$scope.cat2,$scope.cat3];
  
          $scope.cat1 = [
        {
          id: 165,
          title: 'Cat1 aa',
          start: '2014-06-01',
          end: '2014-06-02',
          color  : '#f12',
          category: 'cat1'
        },
        {
        	id: 67,
          title: 'Cat1 bb',
          start: '2014-06-01',
          end: '2014-06-02',
          color  : '#f12',
          category: 'cat1'
          
        }
      ];
  
-save-data = callback function ที่ส่ง data หลังจากปรับเปลี่ยนแล้ว
