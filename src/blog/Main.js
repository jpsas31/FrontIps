import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Markdown from './Markdown'
function Main ({ title }) {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('https://gist.githubusercontent.com/rt2zz/e0a1d6ab2682d2c47746950b84c0b6ee/raw/83b8b4814c3417111b9b9bef86a552608506603e/markdown-sample.md')
      .then((res) => res.text())
      .then((text) => setPosts([text]))
  }, [])

  return (
    <Grid item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3
        }
      }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))}
    </Grid>
  )
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired
}

export default Main
