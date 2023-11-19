import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ComicForm from './components/ComicForm';
import ComicDisplay from './components/ComicDisplay';
import ComicList from './components/ComicList';
import { styled } from '@mui/system';
import HomePage from './components/HomePage';
const CustomAppBar = styled(AppBar)({
  marginBottom: '20px',
});

const NavLink = styled(Link)({
  textDecoration: 'none',
  color: 'white',
  marginLeft: '10px',
});

const App = () => {
  return (
    <Router>
      <div>
        <CustomAppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Comic Create
            </Typography>
            <Button color="inherit">
              <NavLink to="/">Home</NavLink>
            </Button>
            <Button color="inherit">
              <NavLink to="/create">Create Comic</NavLink>
            </Button>
            <Button color="inherit">
              <NavLink to="/blog">Comic Blog</NavLink>
            </Button>
          </Toolbar>
        </CustomAppBar>

        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<ComicList />} />
            <Route path="/comic/:comicName" element={<ComicDisplay />} />
            <Route path="/create" element={<ComicForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};
export default App;
