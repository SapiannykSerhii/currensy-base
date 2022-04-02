import { render, screen } from "@testing-library/react";
import ResultBox from "./ResultBox";
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {
  it('should render without crashing',() => {
    render (<ResultBox amount={111} from='PLN' to='USD'/>)
  })

  const testCasesAmount = [
    {amount: 100},
    {amount: 200},
    {amount: 32},
    {amount: 50}
  ];

  for(const testObj of testCasesAmount){

    it('should render proper info about conversion wthen PLN -> USD', () => {
      render (<ResultBox amount={testObj.amount} from='PLN' to="USD"/>)
      const formattedAmount = formatAmountInCurrency(testObj.amount, 'PLN')
      const convertedAmount = formatAmountInCurrency((testObj.amount / 3.5), 'USD')
      const outputFiled = screen.getByTestId('output')
      expect(outputFiled).toHaveTextContent( `${formattedAmount} = ${convertedAmount}` )
    })
  }

  for(const testObj of testCasesAmount){
    it('should render proper info about conversion wthen USD -> PLN', () => {
      render (<ResultBox amount={testObj.amount} from='USD' to="PLN"/>)
      const formattedAmount = formatAmountInCurrency(testObj.amount, 'USD')
      const convertedAmount = formatAmountInCurrency((testObj.amount * 3.5), 'PLN')
      const outputFiled = screen.getByTestId('output')
      expect(outputFiled).toHaveTextContent(`${formattedAmount} = ${convertedAmount}`)
    })
  }

  const testWrongValue = [
    {from: 'PLN', to: 'UDS', amount:-123},
    {from: 'USD', to: 'PLN', amount:-12},
    {from: 'PLN', to: 'UDS', amount:-23},
    {from: 'USD', to: 'PLN', amount:-3}
  ]

  for (const testObj of testWrongValue) {
    it('should render "Wrong value" if a amount is negative', () => {
      render (<ResultBox amount={testObj.amount} from={testObj.from} to={testObj.to}/>)
      const outputFiled = screen.getByTestId('output')
      expect (outputFiled).toHaveTextContent('Wrong value..')
    })
  }
})    