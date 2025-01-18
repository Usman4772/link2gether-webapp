"use client";

import { Loader2 } from "lucide-react";
import React from "react";

const MaskButton = ({
  text,
  loading = false,
  onClick,
  className,
}: {
  text: string;
  loading?: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div className={`${className} `} role="button" onClick={onClick}>
      <div className="button-container-2">
        <span className="mas">{text}</span>
        <button
          type="button"
          name="Hover"
          className="flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" />}
          {text}
        </button>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Lato:100,300,400");
        @import url("https://fonts.googleapis.com/css?family=Roboto:100");

        .container {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .button-container-2 {
          position: relative;
          width: 200px;
          height: 50px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 7vh;
          overflow: hidden;
          border: 1px solid #000;
          font-family: "Lato", sans-serif;
          font-weight: 300;
          transition: 0.5s;
          letter-spacing: 1px;
          border-radius: 8px;
        }

        .button-container-2 button {
          width: 101%;
          height: 100%;
          font-family: "Lato", sans-serif;
          font-weight: 300;
          font-size: 11px;
          letter-spacing: 1px;
          font-weight: bold;
          background: #000;
          -webkit-mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png");
          mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png");
          -webkit-mask-size: 3000% 100%;
          mask-size: 3000% 100%;
          border: none;
          color: #fff;
          cursor: pointer;
          -webkit-animation: ani2 0.7s steps(29) forwards;
          animation: ani2 0.7s steps(29) forwards;
        }

        .button-container-2 button:hover {
          -webkit-animation: ani 0.7s steps(29) forwards;
          animation: ani 0.7s steps(29) forwards;
        }

        .mas {
          position: absolute;
          color: #000;
          text-align: center;
          width: 101%;
          font-family: "Lato", sans-serif;
          font-weight: 300;
          position: absolute;
          font-size: 11px;
          margin-top: 17px;
          overflow: hidden;
          font-weight: bold;
        }

        @-webkit-keyframes ani {
          from {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }

          to {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }
        }

        @keyframes ani {
          from {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }

          to {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }
        }

        @-webkit-keyframes ani2 {
          from {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }

          to {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }
        }

        @keyframes ani2 {
          from {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }

          to {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }
        }

        a {
          color: #00ff95;
        }
      `}</style>
    </div>
  );
};

export default MaskButton;
