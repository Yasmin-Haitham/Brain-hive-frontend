import React, { useEffect } from "react";

import "../todolist.css";
import { Button } from "react-bootstrap";

function Todolist() {
  useEffect(() => {
    // Add a "checked" symbol when clicking on a list item
    const list = document.querySelector("ul");
    list.addEventListener(
      "click",
      function (ev) {
        if (ev.target.tagName === "LI") {
          ev.target.classList.toggle("checked");
        }
      },
      false
    );
  }, []); // Empty dependency array means the effect runs once after the initial render

  const newElement = () => {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        const div = this.parentElement;
        div.style.display = "none";
      };
    }
  };

  return (
    <div style={{width:"50%", marginTop:"50px"}}>
     
      <>
        <div id='myDIV' className='header'>
          <h2>To-Do-List</h2>
          <input
            type='text'
            className='myInput'
            placeholder='Add your Own...'
          />
          <Button onClick={newElement} className='addBtn'>
            Add
          </Button>
        </div>
        <div className='todo-Container'>
          <ul id='myUL'>
            <li>Hit the gym</li>
            <li className='checked'>Pay bills</li>
            <li>Meet Ali</li>
            <li>Buy eggs</li>
            <li>Read a book</li>
            <li>Organize office</li>
          </ul>
        </div>
      </>
    </div>
  );
}

export default Todolist;
