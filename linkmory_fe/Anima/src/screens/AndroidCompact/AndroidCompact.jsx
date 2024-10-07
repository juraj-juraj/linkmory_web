import React from "react";
import { FacebookOriginal } from "../../icons/FacebookOriginal";
import { FiLink22 } from "../../icons/FiLink22";
import { FiUser } from "../../icons/FiUser";
import { Instagram } from "../../icons/Instagram";
import { LinkedinOriginal } from "../../icons/LinkedinOriginal";
import "./style.css";

export const AndroidCompact = () => {
  return (
    <div className="android-compact">
      <div className="div">
        <div className="upload">
          <img className="group" alt="Group" src="https://c.animaapp.com/EQg0p3Ef/img/group-176719@2x.png" />
          <div className="text-wrapper">Upload</div>
        </div>
        
        
<div className="about-me">
  <div className="overlap-group">
    {/* Replace the static text with an input element */}
    <input
      id="bio"
      name="bio"
      placeholder="About me..."  {/* This displays "About me..." as the placeholder */}
      className="text-wrapper-2"  {/* Retain the original styling class */}
    />
  </div>
</div>


        
        <div className="name">
          <div className="group-2">
            <FiUser className="fi-user" />
            <div className="text-wrapper-3">Name</div>
          </div>
        </div>
        <img className="vector" alt="Vector" src="https://c.animaapp.com/EQg0p3Ef/img/vector-4.svg" />
        <div className="text-wrapper-4">Make a profile</div>
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="contact-URL">
              <div className="group-3">
                <FiLink22 className="fi-link" />
                <div className="text-wrapper-5">Paste your contact URL</div>
              </div>
            </div>
            <FacebookOriginal className="facebook-original" />
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap">
            <div className="contact-URL">
              <div className="group-4">
                <FiLink22 className="fi-link-2-2" />
                <div className="text-wrapper-6">Paste your contact URL</div>
              </div>
            </div>
            <LinkedinOriginal className="linkedin-original" />
          </div>
        </div>
        <div className="group-5">
          <div className="group-6">
            <FiLink22 className="fi-link" />
            <div className="text-wrapper-5">Paste your contact URL</div>
          </div>
          <Instagram className="instagram-instance" />
        </div>
      </div>
    </div>
  );
};
