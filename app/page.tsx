"use client"
import React from 'react'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { Alert, Container, Stack, Typography } from '@mui/material';

export default function Home() {
  const [clickCount, setClickCount] = React.useState(0)
  const [buttonPosition, setButtonPosition] = React.useState({x: 0, y: 0})
  const [taunt, setTaunt] = React.useState('')
  const FINAL_CLICK_COUNT = 1000000
  // every 10th click, taunt the user
  const taunts = [
    "We can't make it too easy - gotta practice clicking a button that might move around!",
    "You're gonna let us down again, huh?",
    // make a joke about the eagles losing if he can't get to 1 million clicks
    "You small, Button Big!",
    "Eagles will lose to the Cowboys if you can't get to 1 million clicks!",
  ]

  const handleClick = () => {
    setClickCount(clickCount + 1)
  }

  React.useEffect(() => {
    // every 10th click (excluding first click), move the button to a random position
    if (clickCount > 0 && clickCount % 10 === 0 && clickCount < FINAL_CLICK_COUNT) {
      tauntUser()
      moveButton()
    }
  }, [clickCount])

  const tauntUser = () => {
    if (clickCount === 10) {
      return setTaunt(taunts[0])
    }
    const taunt = taunts[Math.floor(Math.random() * taunts.length)]
    setTaunt(taunt)
  }

  const moveButton = () => {
    const x = Math.floor(Math.random() * 200)
    const y = Math.floor(Math.random() * 200)
    setButtonPosition({x, y})
  }

  return (
      <Container maxWidth="md">
        <Stack spacing={2} sx={{ width: '100%', textAlign:'center' }}>
        <h1>Practice Clicking the Button, Max!</h1>
        <div style={{marginBottom:20}}>
          You need to practice clicking the button. Once you get to 1 million clicks, 
          you will have restored our trust in you.
        </div>
        <div>
        { taunt && clickCount < FINAL_CLICK_COUNT &&
          <Alert icon={false} severity="error" style={{marginBottom:20}}>
            <Typography variant="h5" component="span" sx={{fontWeight: 'bold'}}>
              {taunt}
            </Typography>
          </Alert>
        }
        { clickCount >= FINAL_CLICK_COUNT &&
          <Alert icon={false} severity="success" style={{marginBottom:20}}>
            <Typography variant="h5" component="span" sx={{fontWeight: 'bold'}}>
              You did it! You clicked the button 1 million times! Take a screenshot for proof and tweet it.
            </Typography>
          </Alert>
        }
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={clickCount / FINAL_CLICK_COUNT * 100}/>
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {`${Math.round(clickCount / FINAL_CLICK_COUNT * 100000) / 100000 * 100}%`}
            </Typography>
          </Box>
        </Box>
        </div>
        <div>
         Click count <br/> <Typography 
          variant="h4" 
          component="span" 
          sx={{fontWeight: 'bold'}}>
            {clickCount}</Typography>
        </div>
        <div>
        <Button 
          style={{
            position: 'relative', 
            left: `${buttonPosition.x}px`, 
            top: `${buttonPosition.y}px`
          }}
          variant={'contained'}
          onClick={() => handleClick()}
          size={'large'}>
            Publish
        </Button>
        </div>
        </Stack>
      </Container>
  )
}
