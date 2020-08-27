function updateGmailPhotoFromDrive() {
 var folder = DriveApp.getFoldersByName('batchstudentphoto').next();
 var contents = folder.getFiles(); 
 var cnt = 0;
 var file;
 
 while (contents.hasNext()) {
 try {
    var file = contents.next();
    cnt++;
    var fileName = file.getName();
    var userEmail  = fileName.split('.').slice(0, -1).join('.') ;
    var blob = file.getBlob();
    var data = Utilities.base64EncodeWebSafe(blob.getBytes());
    AdminDirectory.Users.Photos.update({photoData: data}, userEmail);
    Logger.log('Email %s profile changed to %s.', userEmail, fileName);
 }
  catch (err) {
      Logger.log(err.toString());
    }
  }
}
