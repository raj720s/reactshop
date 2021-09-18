import React from "react";
import Helmet from "react-helmet";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title} </title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "welcom to vani",
  description: "the best site from kd",
  keywords: "human , electronics ,iphone",
};

export default Meta;
