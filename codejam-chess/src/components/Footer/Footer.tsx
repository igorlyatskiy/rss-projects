import React from "react";
import "./Footer.sass";

class Footer extends React.PureComponent {
  render() {
    return (
      <footer className='footer'>
        <p className='self-review'>
          <a href='https://youtu.be/MRMYqdfhR_U' target='_blank' rel='noreferrer'>
            Watch my self-review
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png'
              alt='Self-review'
            />
          </a>
        </p>
        <p className='about-me'>
          <a href='https://github.com/igorlyatskiy' target='_blank' rel='noreferrer'>
            igorlyatskiy
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png'
              alt='My github'
            />
          </a>
        </p>
        <a href='https://rs.school/js-stage0/' target='_blank' rel='noreferrer'>
          <p className='footer__text'>RS School 2021</p>
        </a>
      </footer>
    );
  }
}

export default Footer;
