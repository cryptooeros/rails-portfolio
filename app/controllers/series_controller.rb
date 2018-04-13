# This controller handles requests for Series data.
class SeriesController < ApplicationController
  # Retrieve the monthly series values for the symbols specified in params.
  def monthly_series
    logger.info 'MONTHLY SERIES LOAD BEGIN.'
    series = DataCache.monthly_series(params[:symbols].split(','), params[:start_date], params[:end_date])
    logger.info 'MONTHLY SERIES LOAD END.'
    render json: series, each_serializer: SeriesSerializer, include: 'instrument'
  end

  # Update Series table from live feed.
  # Intended for admin user only.
  def series_bulk_load
    logger.info 'SERIES BULK LOAD REQUESTED.'
    fn_name = params.key?('allSeries') ? 'series_bulk_load_all' : 'series_bulk_load_active'
    FeedWorker.perform_async(fn_name)
    head :accepted
  end
end
