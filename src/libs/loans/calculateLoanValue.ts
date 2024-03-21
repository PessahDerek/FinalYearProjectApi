
/*
    * SI = (Principle * Rate * Time)/100
    * Time is assumed to be in months but interest is calculated per annum so divide by 12
    * hence:
    *   SI = (Principle * Rate * (Time/12))/100
    * */
export const calculateLoanValue = (
    rate: number, principal: number, deadline: Date
) => {
    const time = (deadline.getMonth()+1)/12
    return (principal * rate * time)/100;
}

