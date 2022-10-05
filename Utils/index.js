document.addEventListener("eventType", (event) => {
  // do something
});
document.addEventListener("eventType", function (event) {
  // do something
});

function func1(event) {
  // do something
}
document.addEventListener("eventType", func1);

const func2 = function (event) {
  // do something
}
document.addEventListener("eventType", func2);

const func3 = (event)=>{
  // do something
}
document.addEventListener("eventType", func3);
