import React from 'react'

function Progress () {
    return (
    <div className = "progress">
      <h1 className = "progress__head">Progress</h1>
        <div class="p-4">
            <h3>Order Tracking</h3>
            <table class="table table-bordered track_tbl">
                <thead>
                    <tr>
                        <th></th>
                        <th>S No</th>
                        <th>Status</th>
                        <th>Distibutor</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="active">
                        <td class="track_dot">
                            <span class="track_line"></span>
                        </td>
                        <td>01</td>
                        <td>Dispatched from distibutor address</td>
                        <td>Flipkart</td>
                        <td>31/07/2018 22:24:PM</td>
                    </tr>
                    <tr>
                        <td class="track_dot">
                            <span class="track_line"></span>
                        </td>
                        <td>01</td>
                        <td>Dispatched from distibutor address</td>
                        <td>Flipkart</td>
                        <td>31/07/2018 22:24:PM</td>
                    </tr>
                    <tr>
                        <td class="track_dot">
                            <span class="track_line"></span>
                        </td>
                        <td>01</td>
                        <td>Dispatched from distibutor address</td>
                        <td>Flipkart</td>
                        <td>31/07/2018 22:24:PM</td>
                    </tr>
                    <tr>
                        <td class="track_dot">
                            <span class="track_line"></span>
                        </td>
                        <td>01</td>
                        <td>Dispatched from distibutor address</td>
                        <td>Flipkart</td>
                        <td>31/07/2018 22:24:PM</td>
                    </tr>
                    <tr>
                        <td class="track_dot">
                            <span class="track_line"></span>
                        </td>
                        <td>01</td>
                        <td>Dispatched from distibutor address</td>
                        <td>Flipkart</td>
                        <td>31/07/2018 22:24:PM</td>
                    </tr>
                    <tr>
                        <td class="track_dot">
                            <span class="track_line"></span>
                        </td>
                        <td>01</td>
                        <td>Dispatched from distibutor address</td>
                        <td>Flipkart</td>
                        <td>31/07/2018 22:24:PM</td>
                    </tr>
                    <tr>
                        <td class="track_dot">
                            <span class="track_line"></span>
                        </td>
                        <td>01</td>
                        <td>Dispatched from distibutor address</td>
                        <td>Flipkart</td>
                        <td>31/07/2018 22:24:PM</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Progress
