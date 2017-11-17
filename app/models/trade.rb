# A Trade, for this application, represents a specific sale of a particular Instrument.
# The feeds available to this application may not enumerate every trade, but will just provide
# the latest sales data at a given time.
class Trade < ApplicationRecord
  belongs_to :instrument
  attr_accessor :error

  def changed?(compare)
    (trade_price != compare.trade_price) || (trade_date < compare.trade_date)
  end
end
