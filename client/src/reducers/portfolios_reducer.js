export default function portfoliosReducer(state= {updatingPortfolios: false, portfolios: []}, action) {
// console.log("ACTION type: " + action.type + " pl: " + action.payload + " STATE: " + JSON.stringify(state));
  let portfolios, portfolio, portfolioIndex, payloadPosition, payloadPortfolio;

  switch ( action.type ) {
    // ************************* //
    // *** PORTFOLIO ACTIONS *** //
    // ************************* //

    // Add a Portfolio
    case 'ADDING_PORTFOLIO':
      return Object.assign({}, state, {updatingPortfolios: true})
    case 'ADD_PORTFOLIO':
      portfolios = [action.payload, ...state.portfolios];
      return Object.assign({}, state, {updatingPortfolios: false, portfolios: portfolios})

    // Delete a Portfolio
    case 'DELETING_PORTFOLIO':
      return Object.assign({}, state, {updatingPortfolios: true})
    case 'DELETE_PORTFOLIO':
      payloadPortfolio = action.payload;
      portfolioIndex = state.portfolios.findIndex(portfolio => {return portfolio.id === payloadPortfolio.id;});
      portfolios = [...state.portfolios.slice(0,portfolioIndex), ...state.portfolios.slice(portfolioIndex+1)]
      return Object.assign({}, state, {updatingPortfolios: false, portfolios: portfolios})

    // Load Portfolios
    case 'LOADING_PORTFOLIOS':
      return Object.assign({}, state, {updatingPortfolios: true})
    case 'LOAD_PORTFOLIOS':
      return Object.assign({}, state, {updatingPortfolios: false, portfolios: action.payload})

    // Update a Portfolio
    case 'UPDATING_PORTFOLIO':
      return Object.assign({}, state, {updatingPortfolios: true})
    case 'UPDATE_PORTFOLIO':
      payloadPortfolio = action.payload;
      portfolioIndex = state.portfolios.findIndex(portfolio => {return portfolio.id === payloadPortfolio.id;});
      portfolios = [...state.portfolios.slice(0,portfolioIndex), payloadPortfolio, ...state.portfolios.slice(portfolioIndex+1)];
      return Object.assign({}, state, {updatingPortfolios: false, portfolios: portfolios});

      // ********************************** //
      // *** PORTFOLIO POSITION ACTIONS *** //
      // ********************************** //

      // Update a Position
      case 'ADDING_POSITION':
        return Object.assign({}, state, {updatingPortfolios: true})
      case 'ADD_POSITION':
        payloadPortfolio = action.payload;
        portfolioIndex = state.portfolios.findIndex(portfolio => {return portfolio.id === payloadPortfolio.id;});
        portfolios = [...state.portfolios.slice(0,portfolioIndex), payloadPortfolio, ...state.portfolios.slice(portfolioIndex+1)];
        return Object.assign({}, state, {updatingPortfolios: false, portfolios: portfolios});

    // Delete a Position
    case 'DELETING_POSITION':
      return Object.assign({}, state, {updatingPortfolios: true})
    case 'DELETE_POSITION':
      payloadPosition = action.payload;
      portfolioIndex = state.portfolios.findIndex(portfolio => {return portfolio.id === payloadPosition.portfolio_id;});
      portfolio = Object.assign({}, state.portfolios[portfolioIndex]);
      portfolio.open_positions = state.portfolios[portfolioIndex].open_positions.filter(open_position => open_position.id !== payloadPosition.id);
      portfolios = [...state.portfolios.slice(0,portfolioIndex), portfolio, ...state.portfolios.slice(portfolioIndex+1)];
      return Object.assign({}, state, {updatingPortfolios: false, portfolios: portfolios});

    // Update a Position
    case 'UPDATING_POSITION':
      return Object.assign({}, state, {updatingPortfolios: true})
    case 'UPDATE_POSITION':
      payloadPortfolio = action.payload;
      portfolioIndex = state.portfolios.findIndex(portfolio => {return portfolio.id === payloadPortfolio.id;});
      portfolios = [...state.portfolios.slice(0,portfolioIndex), payloadPortfolio, ...state.portfolios.slice(portfolioIndex+1)];
      return Object.assign({}, state, {updatingPortfolios: false, portfolios: portfolios});

    default:
      return state;
  }
}
