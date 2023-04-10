// import React, { useState, useEffect } from "react";
import React from "react";
import Table from "./Table";
// import { Spinner } from "../styles/Spinner";
import { AppWrapper } from "../styles/AppWrapper";
// import { fetchPersons } from "../requests";

const App = () => {
  return (
    <AppWrapper>
      <h1>Person Table</h1>
      <Table />
    </AppWrapper>
  );

  // return (
  //   <>
  //     {loading ? (
  //       <Spinner>
  //         <div className="spinner"></div>
  //       </Spinner>
  //     ) : (
  //       <AppWrapper>
  //         <h1>Person Table</h1>
  //         <Table persons={persons} setPersons={setPersons} />
  //       </AppWrapper>
  //     )}
  //   </>
  // );
};

export default App;
