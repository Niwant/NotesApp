import React from "react";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <h1 style={{ fontFamily: "'Cabin Sketch', cursive", fontSize: "115px" }}>
        <Zoom cascade>NotesApp</Zoom>
      </h1>
      <p
        style={{ color: "red", width: "55vw", fontWeight: "bold" }}
        className="center-align"
      >
        <Fade bottom>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
          qui molestiae rem vel quos hic incidunt vero sint! Odit, ad omnis?
          Optio quidem repudiandae, et est facilis nobis cupiditate molestias!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Exercitationem, temporibus aliquam est inventore necessitatibus
          laborum magni cumque eos? Impedit, voluptatem corrupti saepe beatae
          non ex distinctio. Porro ducimus eveniet dicta.
        </Fade>
      </p>
    </div>
  );
}

export default Home;
