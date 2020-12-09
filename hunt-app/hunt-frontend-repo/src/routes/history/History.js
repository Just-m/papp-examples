import React from 'react';
import styled from 'styled-components';
import { matchPath, Switch, useHistory, useLocation } from 'react-router';
import { Route, useRouteMatch, Link } from 'react-router-dom';
import Quest from './Quest';
import Wheel from './Wheel';

const Styled = styled.div`
  .group-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
  .btn {
    width: 48%;
  }
`;

const History = (props) => {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const questUrl = `${url}/quest`;
  const wheelUrl = `${url}/wheel`;
  const history = useHistory();
  const linkFactories = [
    {
      to: questUrl,
      desc: 'Quest',
      isActived: matchPath(location.pathname, questUrl),
    },
    {
      to: wheelUrl,
      desc: 'Wheel',
      isActived: matchPath(location.pathname, wheelUrl),
    },
  ];
  React.useEffect(() => {
    if (!matchPath(location.pathname, ['quest', 'wheel'])) {
      history.push(wheelUrl);
    }
  }, []);
  return (
    <Styled>
      <div className='group-btn'>
        {linkFactories.map((item) => (
          <Link
            className={`btn ${item?.isActived ? 'btn-actived' : ''}`}
            to={item.to}
          >
            {item.desc}
          </Link>
        ))}
      </div>
      <Switch>
        <Route path={`${path}`} exact={true} />
        <Route
          path='/history/quest'
          exact={true}
          component={Quest}
          title='Quest'
        />
        <Route
          path='/history/wheel'
          exact={true}
          component={Wheel}
          title='Wheel'
        />
      </Switch>
    </Styled>
  );
};

History.propTypes = {};

export default React.memo(History);
