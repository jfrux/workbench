import * as services from "../../constants/workbench_services";
import zmq from 'zmq';

const publisher = zmq.socket('pub')

publisher.bind('tcp://*:5563', function(err) {
  if(err)
    console.log(err)
  else
    console.log('Listening on 5563…')
})
services.forEach((service) => {
  console.log("service:", service);
});
