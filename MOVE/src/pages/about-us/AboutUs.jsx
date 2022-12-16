import React from "react";

// styles
import "./aboutUs.scss";

// components
import Sidebar from "../../components/sidebar/Sidebar";

// mui components
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const AboutUs = () => {
  return (
    <div className="aboutUs">
      <Sidebar />
      <div className="aboutUsContainer">
        <div className="contents">
          <div className="about">
            <p className="aboutHeader">About MOVE</p>
            <p className="description">
              MOVE is a web application that aims to digitize the entire process
              of undertaking outreach activities, from the submission of
              outreach proposals through the generation of accomplishment
              reports. In addition, it offers a centralized hub for all Computer
              Engineering students, faculty, and staff to share outreach ideas
              and keep track of ongoing initiatives in real time.
            </p>
            <p className="description">
              The following 4th-year Computer Engineering students at
              Technological Institute of the Philippines QC worked on the MOVE
              project, which is a planner for reaching out to people.
            </p>
          </div>
          <div className="header">
            <p>Developers</p>
          </div>
          <div className="detailsCardLeft-Gaba">
            <div className="cardLeft">
              <img
                src={require("./jander-canva-grey-edit1-final.png")}
                alt=""
              />
            </div>
            <div className="cardRight">
              <div className="cardRightTop">
                <div className="cardRightTopLeft">
                  <div className="name">Jander P. Gaba</div>
                  <div className="elective">System Administration</div>
                  <div className="email">qjpgaba@tip.edu.ph</div>
                </div>
                <div className="cardRightTopRight">
                  <a href="https://web.facebook.com/jandeeergaba/">
                    <FacebookIcon className="socials" />
                  </a>
                  <a href="https://www.instagram.com/jandeeer_/">
                    <InstagramIcon className="socials" />
                  </a>
                  <a href="https://github.com/jgaba-cpe">
                    <GitHubIcon className="socials" />
                  </a>
                </div>
              </div>
              <div className="cardRightBottom">
                <p>
                  Jander Gaba is a student specializing in Systems
                  Administration with over six months of web development
                  experience. He is incredibly effective in the technology field
                  due to his eagerness to learn. He concentrates on his goals
                  and responsibilities to advance and flourish in this sector.
                </p>
              </div>
            </div>
          </div>
          <div className="detailsCardRight-Marmito">
            <div className="cardLeft">
              <div className="cardLeftTop">
                <div className="cardLeftTopLeft">
                  <div className="name">Roxanne A. Marmito</div>
                  <div className="elective">System Administration</div>
                  <div className="email">qramarmito@tip.edu.ph</div>
                </div>
                <div className="cardLeftTopRight">
                  <a href="https://www.facebook.com/roxanne.marmito.7">
                    <FacebookIcon className="socials" />
                  </a>
                  <a href="https://www.instagram.com/xro_anne">
                    <InstagramIcon className="socials" />
                  </a>
                  <a href="https://github.com/ramarmito">
                    <GitHubIcon className="socials" />
                  </a>
                </div>
              </div>
              <div className="cardLeftBottom">
                <p>
                  Roxanne Marmito is a Systems Administration student who
                  specializes on UI/UX designs and web application prototyping.
                  She is really diligent and punctual with her assignments. She
                  like to complete her job early and be productive during the
                  day, especially for her academic assignments.
                </p>
              </div>
            </div>
            <div className="cardRight">
              <img src={require("./rox-canva-grey-edit1-final.png")} alt="" />
            </div>
          </div>
          <div className="detailsCardLeft-Regio">
            <div className="cardLeft">
              <img src={require("./clars-canva-grey-edit1-final.png")} alt="" />
            </div>
            <div className="cardRight">
              <div className="cardRightTop">
                <div className="cardRightTopLeft">
                  <div className="name">Clarissa R. Regio</div>
                  <div className="elective">System Administration</div>
                  <div className="email">qcrregio@tip.edu.ph</div>
                </div>
                <div className="cardRightTopRight">
                  <a href="https://www.facebook.com/klarsissa/">
                    <FacebookIcon className="socials" />
                  </a>
                  <a href="https://www.instagram.com/klarsissa/">
                    <InstagramIcon className="socials" />
                  </a>
                  <a href="https://github.com/crregio">
                    <GitHubIcon className="socials" />
                  </a>
                </div>
              </div>
              <div className="cardRightBottom">
                <p>
                  Clarissa Regio is a student majoring in Systems Administration
                  that edits several presentations and enjoys learning web
                  programming and prototyping in various apps. She is extremely
                  proactive and possesses an air of authority. She enjoys
                  completing numerous tasks, is highly self-motivated, and has a
                  strong sense of collaboration.
                </p>
              </div>
            </div>
          </div>
          <div className="detailsCardRight-Garcia">
            <div className="cardLeft">
              <div className="cardLeftTop">
                <div className="cardLeftTopLeft">
                  <div className="name">Mary Cris Garcia</div>
                  <div className="elective">Intelligent Systems</div>
                  <div className="email">qmc-garcia@tip.edu.ph</div>
                </div>
                <div className="cardLeftTopRight">
                  <a href="https://www.facebook.com/emsengg">
                    <FacebookIcon className="socials" />
                  </a>
                  <a href="https://www.instagram.com/exmsi_">
                    <InstagramIcon className="socials" />
                  </a>
                  <a href="https://github.com/Exmsi">
                    <GitHubIcon className="socials" />
                  </a>
                </div>
              </div>
              <div className="cardLeftBottom">
                <p>
                  Mary Cris Garcia is an Intelligent Systems student whose main
                  focus is organizing the project timelines and activities. She
                  ensures that the group completes everything on time or ahead
                  of the project deadline while maintaining each other's morale.
                  She also excels in oral presentation and serves as the team's
                  spokesperson.
                </p>
              </div>
            </div>
            <div className="cardRight">
              <img src={require("./mc-canva-grey-edit1-final.png")} alt="" />
            </div>
          </div>
          <div className="detailsCardLeft-Bravo">
            <div className="cardLeft">
              <img src={require("./ian-canva-grey-edit1-final.png")} alt="" />
            </div>
            <div className="cardRight">
              <div className="cardRightTop">
                <div className="cardRightTopLeft">
                  <div className="name">Ian Gabriel B. Bravo</div>
                  <div className="elective">System Administration</div>
                  <div className="email">qigbbravo@tip.edu.ph</div>
                </div>
                <div className="cardRightTopRight">
                  <a href="https://www.facebook.com/IanBravss/">
                    <FacebookIcon className="socials" />
                  </a>
                  <a href="https://www.instagram.com/inbrvsss/">
                    <InstagramIcon className="socials" />
                  </a>
                  <a href="https://github.com/qigbbravo-tip">
                    <GitHubIcon className="socials" />
                  </a>
                </div>
              </div>
              <div className="cardRightBottom">
                <p>
                  Ian Gabriel B. Bravo is a Systems Administration student who
                  aims to explore more and have broad knowledge about web
                  development. He mainly focuses on the project's documentation
                  and testing.
                </p>
              </div>
            </div>
          </div>
          <div className="header">
            <p>Adviser</p>
          </div>
          <div className="detailsCardRight-Taylar">
            <div className="cardLeft">
              <div className="cardLeftTop">
                <div className="cardLeftTopLeft">
                  <div className="name">Dr. Jonathan V. Taylar</div>
                  <div className="elective">Adviser</div>
                  <div className="email">jtaylar.cpe@tip.edu.ph</div>
                </div>
              </div>
              <div className="cardLeftBottom">
                <p>
                  Jonathan Taylar holds a Doctor of Engineering with a
                  concentration in Computer Engineering. A lecturer, trainer,
                  instructor, and teacher with over ten years of expertise in IT
                  and engineering who has worked with varied students at the
                  secondary, tertiary, and vocational levels.
                </p>
                <p>
                  Curriculum Development expert who creates and designs
                  instructional materials and has years of experience in the
                  field. Currently employed as Computer Engineering Faculty at
                  the Quezon City campus of the Technological Institute of the
                  Philippines.
                </p>
              </div>
            </div>
            <div className="cardRight">
              <img src={require("./jtaylar.jpg")} alt="" />
            </div>
          </div>
          <div className="copyright">
            <p className="copyrightHeader">
              Computer Engineering Department • CPE41S3 • Team 3
            </p>
            <p className="copyrightText">
              Copyright © 2022 All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
