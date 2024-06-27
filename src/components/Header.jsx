import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import HeaderLogo from './HeaderLogo';

const Header = (props) => {
  const location = useLocation();
  let firstClass;
  let secondClass;
  let mediaType;

  switch (location.pathname) {
    case '/images':
      firstClass = "image_logo_one";
      secondClass = "image_logo_two";
      mediaType = "Images";
      break;
    case '/videos':
      firstClass = "video_logo_one";
      secondClass = "video_logo_two";
      mediaType = "Videos";
      break;
    case '/docs':
      firstClass = "doc_logo_one";
      secondClass = "doc_logo_two";
      mediaType = "Documents";
      break;
    default:
      firstClass = "image_logo_one";
      secondClass = "image_logo_two";
      mediaType = "Images";
      break;
  }
  return (
    <>
      <HeaderLogo class_one="header-logo-one" class_two="header-logo-two" />
      <header className="App-header">
        <Logo class_one={firstClass} class_two={secondClass} mediaType={mediaType} />
      </header>
    </>
  )
}

export default Header;