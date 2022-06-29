import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './Header'
import MainFeaturedPost from './MainFeaturedPost'
import FeaturedPost from './FeaturedPost'
import Footer from './Footer'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

const sections = [
  { title: 'Nosotros', url: '#' },
  { title: 'Afiliaciones', url: '#' },
  { title: 'Afiliados', url: '#' },
  { title: 'Red de atención', url: '#' },
  { title: 'Centros Médicos', url: '#' },
  { title: 'Oficinas', url: '#' },
  { title: 'Droguería Cruz Verde', url: '#' }
]

const mainFeaturedPost = [
  {
    title: '¡Bienvenido!',
    description:
      'Nos encontramos en construcción, siguenos para más información.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imageText: 'main image description'
  },
  {
    title: 'Integrantes ',
    description:
      'Del grupo de amiguis',
    image: 'https://www.xtrafondos.com/wallpapers/personajes-de-brawl-stars-3503.jpg',
    imageText: 'main image description'
  }/*
  {
    title: 'Juan Pablo Salgado ',
    description:
      <p> ◼ Desordenado <br/>  ◼ Inesperdo <br/> ◼ Indie <br/> ◼ Raro  </p>,
    image: 'https://i.imgur.com/GQBUjtO.png',
    imageText: 'main image description'
  },
  {
    title: 'Kevin David Rodriguez ',
    description:
    <p> ◼ Directo <br/>  ◼ Duro <br/> ◼ Solidario <br/> ◼ JojiLover  </p>,
    image: 'https://i.imgur.com/Jbv5XRp.png',
    imageText: 'main image description'
  },
  {
    title: 'Julián Andrés Salamanca ',
    description:
      <p> ◼ Gentil <br/>  ◼ Tímido <br/> ◼ Obsesivo <br/> ◼ Familiar  </p>,
    image: 'https://i.imgur.com/jYm0VGJ.png',
    imageText: 'main image description'
  },
  {
    title: 'Andrés Felipe Giron ',
    description:
      <p> ◼ Cómico <br/>  ◼ Despreocupado <br/> ◼ Sociable <br/> ◼ Comprometido  </p>,
    image: 'https://i.imgur.com/zIuyw5G.png',
    imageText: 'main image description'
  }
  */
]

const featuredPosts = [
  {
    title: 'Todo el mundo miente',
    date: 'Abr 20',
    description:
      'No es mi intención verte la cara de idiota, pero no puedo andar todo el tiempo con los ojos cerrados.',
    image: 'http://3.bp.blogspot.com/-sPXCB2uBq_4/U6XkEQQst3I/AAAAAAAAfMo/TnRVzeHL0xM/s1600/Screen+Shot+2014-06-21+at+3.58.15+PM.png',
    imageLabel: 'Image Text'
  },
  {
    title: 'Maternidad',
    date: 'Abr 20',
    description:
      'El 30% de los padres no saben que están criando al hijo del otro.',
    image: 'https://i.pinimg.com/564x/8e/20/8c/8e208caa89c914865802d6a1750ed8bc.jpg',
    imageLabel: 'Image Text'
  },
  {
    title: 'Negocios riesgosos',
    date: 'Abr 20',
    description:
      'Todos mienten por una razón: funciona. Es lo que permite que la sociedad funcione, separa al hombre de la bestia.',
    image: 'https://i.pinimg.com/564x/62/65/b0/6265b0db8c34cac420f14d8c3d21fc0a.jpg',
    imageLabel: 'Image Text'
  },
  {
    title: 'Veinte vicodin',
    date: 'Abr 20',
    description:
      'La meta en la vida no es eliminar la infelicidad, sino mantenerla al mínimo.',
    image: 'https://i.pinimg.com/564x/ee/02/09/ee0209e60c6a5660b997e6604615d4e5.jpg',
    imageLabel: 'Image Text'
  }
]

/*
const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' }
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon }
  ]
}
*/

const theme = createTheme()

export default function Blog () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="fullwidth" sx={{ mt: 0.5 }}>
        <Header sections={sections} />
        <main>
          {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
          <Carousel autoPlay = {false} >
            {
              mainFeaturedPost.map((item, i) => {
                return (
                <Paper key = {i}>
                  <MainFeaturedPost post={item} />
                </Paper>
                )
              }
              )
            }
          </Carousel>
          <Grid container spacing={4} sx={{ mt: 0.5 }}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        description="Aplicación creada por grupo Amiguis"
      />
    </ThemeProvider>
  )
}
