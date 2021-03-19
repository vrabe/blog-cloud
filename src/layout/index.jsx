import React from "react";
import { Helmet } from "react-helmet";
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';
import config from "../../data/SiteConfig";
import "./index.scss";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    faConfig.autoAddCss = false;
    return (
      <>
        <Helmet>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="description" content={config.siteDescription} />
          <html lang="zh-TW" />
        </Helmet>
        {children}
      </>
    );
  }
}
