const eventSource = new EventSource("http://localhost:8080/stream");

const updateMessage = (data) => {
  const list = document.getElementById("message");
  // const item = document.createElement("p");
  // item.textContent = data;
  // list.append(item);
  list.innerText = data;
};

eventSource.onmessage = (event) => {
  console.log("inside");
  updateMessage(event.data);
};

eventSource.onerror = () => {
  updateMessage("Server Closed Coneection");
  eventSource.close();
};
