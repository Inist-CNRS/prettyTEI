$( document ).ready(function() {

  $("input[type=\"checkbox\"], input[type=\"radio\"]").not("[data-switch-no-init]").bootstrapSwitch();
  $('input[type=\"checkbox\"]').on('switchChange.bootstrapSwitch', function(event, state) {
      $('.modal-body').toggleClass("contentTei formTei");
  });

  /*
  * dropArea is the drag & drop zone
  * listDiv is the section to watch sended elements
  * nbOfFiles is an int incremented when send a file
  */
  var dropArea = $('#dropArea'),
      listDiv = $("#listDiv"),
      nbOfFiles = 0;

  /*
  * readFile()
  * @param file is a single file got by HTML5 file api
  * @param nbOfFiles is an increment INT , to count all files sent to drag & dropp
  */
  function readFile(file,nbOfFiles) {
          // Loop through files with a closure so every FileReader are isolated.
          var reader = new FileReader();
          reader.onload = function(event) { 
                  // get file content , name
                  var name = file.name;
                  var text = event.target.result; 

                  //create figure & div modal 
                  var figure = $('<figure class="figureFile col-sm-3"></figure>'),
                      div = '<div class="modal fade" id="fileContent'+ nbOfFiles +'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">\
                    <div class="modal-dialog teiModal">\
                      <div class="modal-content">\
                        <div class="modal-header">\
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                          <h4 class="modal-title" id="myModalLabel">'+ name +'</h4>\
                        </div>\
                        <div class="modal-body contentTei">\
                          '+ text +'\
                        </div>\
                        <div class="modal-footer">\
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                        </div>\
                      </div>\
                    </div>\
                  </div>';

                  // Add img & figcaption (file name) to figure
                  figure.append('<img src="vendor/img/xml.jpg" class="pictures" alt="xml picture" data-toggle="modal" data-target="#fileContent'+ nbOfFiles +'">','<figcaption>'+ name +'</figcaption>');

                  // Add all created elements to html
                  listDiv.append(figure);
                  listDiv.append(div);

              }
              reader.readAsText(file, "UTF-8");
              
  };


  dropArea.bind({
    // Effect on dragover
    dragover: function() {
      $(this).addClass('hover');
      return false;
    },
    // Remove Class on dragleave
    dragleave: function() {
      $(this).removeClass('hover');
      return false;
    },
    //Function when drop file(s)
    drop: function(e) {
      $(this).removeClass('hover');
      e = e || window.event;
      e.preventDefault();

      e = e.originalEvent || e;
 
      var files = (e.files || e.dataTransfer.files);

      // For every file
      for (var i = 0; i < files.length; i++) {
          readFile(files[i],nbOfFiles);
          nbOfFiles++;
      }
    }
  });

});