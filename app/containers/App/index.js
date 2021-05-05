/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideNav from 'components/SideNav';
import useOutsideClick from 'utils/useOutsideClick';
import GlobalStyle from '../../global-styles';
import NotesPage from 'containers/NotesPage/Loadable';
import { debounce } from "lodash";
import history from 'utils/history';

const AppWrapper = styled.div`
  /* max-width: calc(768px + 16px * 2); */
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  /* padding: 0 16px; */
  flex-direction: column;
`;

export default function App(props) {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('Notes');
  const navRef = useRef(null);
  const changeParams = (text) => {
    if (history.location.search !== `?search=${text}`) {
      history.push({
        pathname: history.location.pathname,
        search: text ? `?search=${text}` : ''
      });
      if (text)
        setActivePage('Search Results');
    }
  }

  const debounceOnChange = useCallback(debounce(changeParams, 500), []);

  const onSearchTextChange = (searchText) => {
    setSearchText(searchText);
    debounceOnChange(searchText);
  }

  useEffect(() => {
    const urlparams = new URLSearchParams(history.location.search);
    if (urlparams.get('search')) {
      setSearchText(urlparams.get('search'));
      setActivePage('Search Results');
    }
    if (urlparams.get('type')) {
      if (urlparams.get('type') === 'pinned') {
        setActivePage('Pinned');
      }

      if (urlparams.get('type') === 'archives') {
        setActivePage('Archived');
      }
    }
  }, [])

  const open = (type) => {
    history.push({
      pathname: history.location.pathname,
      search: type && type!=='notes' ? `?type=${type}` : ''
    });
    let pageType = 'Notes';
    if (type === 'pinned') {
      pageType = 'Pinned';
    }
    if (type === 'archives') {
      pageType = 'Archived';
    }
    setActivePage(pageType);
    setIsOpen(false);
  }

  const closeNav = () => {
    setIsOpen(false);
  }

  useOutsideClick(navRef, closeNav);

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <SideNav ref={navRef} closeNav={closeNav} open={open} isOpen={isOpen}/>
      <Header activePage={activePage} openNav={() => setIsOpen(true)} onSearchTextChange={onSearchTextChange} searchText={searchText}/>
      <Switch>
        <Route exact path="/" component={NotesPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
