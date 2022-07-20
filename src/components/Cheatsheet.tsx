import React from "react";

function Cheatsheet() {
  return (
    <>
      <div className="table-title">Markdown cheatsheet</div>
      <table className="cheatsheet">
        <thead>
          <tr>
            <th>Task</th>
            <th>Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Heading 1</td>
            <td>#</td>
          </tr>
          <tr>
            <td>Heading 2</td>
            <td>##</td>
          </tr>
          <tr>
            <td>Heading 3</td>
            <td>###</td>
          </tr>
          <tr>
            <td>Italics</td>
            <td>*italics*</td>
          </tr>
          <tr>
            <td>Bold</td>
            <td>**Bold**</td>
          </tr>
          <tr>
            <td>Strike</td>
            <td>~~insert~~</td>
          </tr>
          <tr>
            <td>Block quote</td>
            <td>{">"}</td>
          </tr>
          <tr>
            <td>Links</td>
            <td>[link name](link.com)</td>
          </tr>
          <tr>
            <td>Unordered list</td>
            <td>* Item * Item</td>
          </tr>
          <tr>
            <td>Code Block</td>
            <td>`insert code`</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export { Cheatsheet };
